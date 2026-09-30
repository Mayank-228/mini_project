import React, { useState } from 'react';
import JSZip from 'jszip';
import { FLUTTER_PROJECT_FILES, FlutterFile } from '../data/flutterCodeFiles';

interface FlutterCodeViewerProps {
  onClose: () => void;
  onOpenSetupGuide?: () => void;
}

export const FlutterCodeViewer: React.FC<FlutterCodeViewerProps> = ({ onClose, onOpenSetupGuide }) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      const zip = new JSZip();
      FLUTTER_PROJECT_FILES.forEach((file) => {
        zip.file(file.path, file.code);
      });
      zip.file(
        'README.md',
        `# HireMe Market - Flutter Mobile App\n\nRun locally:\nflutter pub get\nflutter run\n`
      );
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hireme_market_flutter.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadingZip(false);
    } catch (e) {
      console.error(e);
      setDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 overflow-hidden">
      {/* Header */}
      <div className="bg-[#161820] border border-[#343847] rounded-2xl p-4 mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#02569B]/20 border border-[#02569B]/40 flex items-center justify-center text-[#54C5F8]">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6.02 15.688L2.3 12 14.314 0h7.37L6.02 15.688zM14.314 24h7.37L15.357 17.67l-3.69 3.69L14.314 24zM6.02 15.688l3.69-3.689 3.688 3.69-3.69 3.69-3.688-3.69z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Flutter Project Source Code</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Flutter 3.20+ / Dart 3.x
              </span>
            </div>
            <p className="text-xs text-[#9ba1b4]">
              Clean, modular, production-ready Dart widgets & screens matching the designs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSetupGuide && (
            <button
              onClick={() => {
                onClose();
                onOpenSetupGuide();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#1e2230] hover:bg-[#282d40] border border-[#343847] text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-indigo-400">help</span>
              <span className="hidden sm:inline">Local Setup Guide</span>
            </button>
          )}

          <button
            onClick={handleDownloadZip}
            disabled={downloadingZip}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">
              {downloadingZip ? 'hourglass_top' : 'download'}
            </span>
            <span>{downloadingZip ? 'Packing...' : 'Download ZIP'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-xl bg-[#4f46e5] hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied Dart Code!' : 'Copy File'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#232630] border border-[#343847] flex items-center justify-center text-[#9ba1b4] hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Main Split: File Tree on left, Code on right */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 overflow-hidden min-h-0">
        {/* File List */}
        <div className="bg-[#161820] border border-[#343847] rounded-2xl p-3 overflow-y-auto space-y-1.5">
          <div className="text-[10px] font-bold text-[#8a8e9e] uppercase px-2 mb-1 tracking-wider">
            Project Files
          </div>
          {FLUTTER_PROJECT_FILES.map((file) => {
            const isSelected = selectedFile.path === file.path;
            return (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#4f46e5]/20 border border-[#4f46e5]/40 text-white font-semibold'
                    : 'text-[#9ba1b4] hover:bg-[#232630] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-[#c4b5fd]">
                    {file.name.endsWith('.yaml') ? 'settings' : 'code'}
                  </span>
                  <span className="truncate">{file.path}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd] flex-shrink-0" />
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#343847]/40 px-2 space-y-2">
            <span className="text-[11px] font-bold text-[#f1f3f9] block">Run Locally:</span>
            <div className="bg-[#0b0c12] p-2 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto">
              flutter create hireme_market<br />
              flutter run
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="md:col-span-3 bg-[#0b0c12] border border-[#343847] rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-[#161820] px-4 py-2.5 border-b border-[#343847] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#c4b5fd]">{selectedFile.path}</span>
              <span className="text-[11px] text-[#8a8e9e] hidden sm:inline">
                — {selectedFile.description}
              </span>
            </div>
            <span className="text-[10px] text-[#8a8e9e] font-mono">
              {selectedFile.code.split('\n').length} lines
            </span>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <pre className="font-mono text-xs text-[#e2e8f0] leading-relaxed whitespace-pre font-light">
              {selectedFile.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
