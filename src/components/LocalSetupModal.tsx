import React, { useState } from 'react';
import JSZip from 'jszip';
import { FLUTTER_PROJECT_FILES } from '../data/flutterCodeFiles';
import { HireMeLogo } from './HireMeLogo';

interface LocalSetupModalProps {
  onClose: () => void;
  onOpenCodeViewer?: () => void;
}

export const LocalSetupModal: React.FC<LocalSetupModalProps> = ({
  onClose,
  onOpenCodeViewer,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'flutter' | 'web' | 'cli'>('flutter');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadFlutterZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // Add all Flutter files
      FLUTTER_PROJECT_FILES.forEach((file) => {
        zip.file(file.path, file.code);
      });

      // Add README.md
      const readmeContent = `# HireMe Market - Flutter Mobile Application

High-velocity on-demand local services & gig marketplace app built with Flutter 3.20+ and Dart 3.x.

## Project Structure
\`\`\`
hireme_market/
├── pubspec.yaml
└── lib/
    ├── main.dart                      # App entry point, Material 3 theme & navigation
    ├── theme/
    │   └── app_theme.dart             # Dark/Light color schemes, Plus Jakarta Sans typography
    ├── widgets/
    │   └── hireme_logo.dart           # Custom vector gradient HireMe brand logo
    └── screens/
        ├── home_screen.dart           # Screen 1: Dark mode home with live vicinity map & pros
        ├── onboarding_screen.dart     # Screen 2: Clean onboarding showcase
        ├── auth_screen.dart           # Screen 3: Welcome back & phone/email authentication
        └── explore_screen.dart        # Screen 4: Category directory & verified worker cards
\`\`\`

## Quick Start on Your Local Machine

### 1. Requirements
- Flutter SDK (>= 3.20.0): https://docs.flutter.dev/get-started/install
- Android Studio (for Android device/emulator) or Xcode (for iOS on macOS)
- VS Code or Android Studio with Flutter/Dart extensions

### 2. Run Locally
\`\`\`bash
# 1. Unzip the downloaded folder
unzip hireme_market_flutter.zip -d hireme_market
cd hireme_market

# 2. Get dependencies
flutter pub get

# 3. Check connected devices
flutter devices

# 4. Run on your phone or emulator
flutter run
\`\`\`

### 3. Run on Chrome (Web)
\`\`\`bash
flutter run -d chrome
\`\`\`
`;
      zip.file('README.md', readmeContent);

      const content = await zip.generateAsync({ type: 'blob' });
      const blobUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'hireme_market_flutter.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate zip', err);
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12141c] border border-[#2b2f3e] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2b2f3e] bg-[#161924] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shadow-xs">
              <HireMeLogo size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Get Code on Your Local Device
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Flutter & Web
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Download the complete codebase or follow step-by-step setup guides.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#232736] border border-[#343a4e] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 1-Click Action Hero Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950/60 via-[#181a28] to-purple-950/40 border-b border-[#2b2f3e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-[16px]">folder_zip</span>
              Instant 1-Click Download
            </span>
            <p className="text-sm font-semibold text-white">
              Complete Flutter Project Archive (.zip)
            </p>
            <p className="text-xs text-slate-400">
              Includes pubspec.yaml, all 4 screens, custom vector logo, theme & live vicinity radar map widget.
            </p>
          </div>

          <button
            onClick={handleDownloadFlutterZip}
            disabled={downloading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloadSuccess ? 'check_circle' : downloading ? 'hourglass_top' : 'download'}
            </span>
            <span>
              {downloadSuccess
                ? 'Downloaded!'
                : downloading
                ? 'Packing ZIP...'
                : 'Download Flutter ZIP'}
            </span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 sm:px-5 pt-3 border-b border-[#2b2f3e] flex items-center gap-2 bg-[#141620]">
          <button
            onClick={() => setActiveTab('flutter')}
            className={`pb-2.5 px-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'flutter'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">phone_android</span>
            <span>Flutter (Android / iOS / Desktop)</span>
          </button>
          <button
            onClick={() => setActiveTab('web')}
            className={`pb-2.5 px-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'web'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>React Web Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`pb-2.5 px-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'cli'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>CLI / Git Instructions</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {activeTab === 'flutter' && (
            <div className="space-y-4">
              <div className="bg-[#181b26] border border-[#2b2f3e] rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                      1
                    </span>
                    Install Flutter SDK
                  </h3>
                  <a
                    href="https://docs.flutter.dev/get-started/install"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>flutter.dev guide</span>
                    <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </a>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Make sure you have Flutter installed. Verify by running in your terminal:
                </p>
                <div className="relative group">
                  <pre className="bg-[#0b0c12] p-2.5 rounded-lg font-mono text-[11px] text-emerald-400">
                    flutter doctor
                  </pre>
                  <button
                    onClick={() => copyToClipboard('flutter doctor', 'c1')}
                    className="absolute right-2 top-2 px-2 py-1 rounded bg-[#232736] text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'c1' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="bg-[#181b26] border border-[#2b2f3e] rounded-xl p-3.5 space-y-3">
                <h3 className="font-bold text-white text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Extract & Open Project
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Extract the downloaded <code className="text-indigo-300">hireme_market_flutter.zip</code> into your workspace and navigate into it:
                </p>
                <div className="relative group">
                  <pre className="bg-[#0b0c12] p-2.5 rounded-lg font-mono text-[11px] text-emerald-400">
                    cd hireme_market{'\n'}flutter pub get
                  </pre>
                  <button
                    onClick={() => copyToClipboard('cd hireme_market\nflutter pub get', 'c2')}
                    className="absolute right-2 top-2 px-2 py-1 rounded bg-[#232736] text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'c2' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="bg-[#181b26] border border-[#2b2f3e] rounded-xl p-3.5 space-y-3">
                <h3 className="font-bold text-white text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Run on Device, Simulator or Chrome
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-[#0f111a] p-2.5 rounded-lg border border-[#2b2f3e]">
                    <span className="text-slate-300 font-semibold block mb-1">Android / iOS:</span>
                    <code className="text-indigo-300 font-mono text-[11px]">flutter run</code>
                  </div>
                  <div className="bg-[#0f111a] p-2.5 rounded-lg border border-[#2b2f3e]">
                    <span className="text-slate-300 font-semibold block mb-1">Chrome Web:</span>
                    <code className="text-indigo-300 font-mono text-[11px]">flutter run -d chrome</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'web' && (
            <div className="space-y-4">
              <div className="bg-[#181b26] border border-[#2b2f3e] rounded-xl p-3.5 space-y-3">
                <h3 className="font-bold text-white text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Running the React + Vite Web App Locally
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  The live interactive preview is built on React 19 + Tailwind CSS + Vite. You can run it on your machine with Node.js 18+:
                </p>
                <div className="relative group">
                  <pre className="bg-[#0b0c12] p-2.5 rounded-lg font-mono text-[11px] text-emerald-400">
                    npm install{'\n'}npm run dev
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npm install\nnpm run dev', 'c3')}
                    className="absolute right-2 top-2 px-2 py-1 rounded bg-[#232736] text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'c3' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Open <code className="text-indigo-300">http://localhost:3000</code> in your browser to interact with all screens and mobile frame.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="bg-[#181b26] border border-[#2b2f3e] rounded-xl p-3.5 space-y-3">
                <h3 className="font-bold text-white text-xs">Direct Flutter Project Scaffolding</h3>
                <p className="text-slate-400 leading-relaxed">
                  If you already have a Flutter app created, you can copy the files directly into your project:
                </p>
                <div className="relative group">
                  <pre className="bg-[#0b0c12] p-2.5 rounded-lg font-mono text-[11px] text-emerald-400">
                    flutter create hireme_market{'\n'}
                    cd hireme_market{'\n'}
                    flutter pub add google_fonts flutter_svg cached_network_image
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'flutter create hireme_market\ncd hireme_market\nflutter pub add google_fonts flutter_svg cached_network_image',
                        'c4'
                      )
                    }
                    className="absolute right-2 top-2 px-2 py-1 rounded bg-[#232736] text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'c4' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-slate-400">
                  Then copy the files from the <strong>Flutter Code</strong> inspector into your <code>lib/</code> folder.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#2b2f3e] bg-[#141620] flex items-center justify-between">
          {onOpenCodeViewer && (
            <button
              onClick={() => {
                onClose();
                onOpenCodeViewer();
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Inspect Raw Flutter Files</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-1.5 rounded-xl bg-[#232736] hover:bg-[#2e3346] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
