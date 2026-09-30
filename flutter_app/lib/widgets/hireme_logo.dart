import 'package:flutter/material.dart';

class HireMeLogoWidget extends StatelessWidget {
  final double size;
  final bool withBoltBadge;

  const HireMeLogoWidget({
    super.key,
    this.size = 36,
    this.withBoltBadge = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          CustomPaint(
            size: Size(size, size),
            painter: _HireMeLogoPainter(),
          ),
          if (withBoltBadge)
            Positioned(
              right: -3,
              bottom: -3,
              child: Container(
                width: size * 0.35,
                height: size * 0.35,
                decoration: BoxDecoration(
                  color: const Color(0xFF4F46E5),
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 1.5),
                  boxShadow: const [
                    BoxShadow(color: Colors.black26, blurRadius: 2),
                  ],
                ),
                child: Center(
                  child: Icon(
                    Icons.bolt,
                    size: size * 0.22,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _HireMeLogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final rect = Rect.fromLTWH(0, 0, size.width, size.height);
    final rrect = RRect.fromRectAndRadius(rect, Radius.circular(size.width * 0.26));

    // Dark Background Gradient
    final bgPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFF1E1C2E), Color(0xFF13141F), Color(0xFF0B0C13)],
      ).createShader(rect);
    canvas.drawRRect(rrect, bgPaint);

    // Subtle Outline Border
    final borderPaint = Paint()
      ..color = const Color(0xFF383C50)
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.03;
    canvas.drawRRect(rrect, borderPaint);

    // Ambient Purple Glow in center
    final glowPaint = Paint()
      ..color = const Color(0xFFA855F7).withOpacity(0.2)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), size.width * 0.3, glowPaint);

    // Neon Roof Chevron
    final roofPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.bottomLeft,
        end: Alignment.topRight,
        colors: [Color(0xFFF43F5E), Color(0xFFEC4899), Color(0xFFA855F7)],
      ).createShader(rect)
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.08
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final roofPath = Path()
      ..moveTo(size.width * 0.28, size.height * 0.44)
      ..lineTo(size.width * 0.50, size.height * 0.25)
      ..lineTo(size.width * 0.72, size.height * 0.44);
    canvas.drawPath(roofPath, roofPaint);

    // Inner Ribbon / S-Loop Motif
    final corePaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFFC084FC), Color(0xFFEC4899), Color(0xFFF43F5E)],
      ).createShader(rect)
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.075
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final corePath = Path()
      ..moveTo(size.width * 0.40, size.height * 0.45)
      ..cubicTo(size.width * 0.40, size.height * 0.38, size.width * 0.60, size.height * 0.38, size.width * 0.60, size.height * 0.48)
      ..cubicTo(size.width * 0.60, size.height * 0.55, size.width * 0.40, size.height * 0.54, size.width * 0.40, size.height * 0.64)
      ..cubicTo(size.width * 0.40, size.height * 0.73, size.width * 0.60, size.height * 0.73, size.width * 0.60, size.height * 0.66);
    canvas.drawPath(corePath, corePaint);

    // White Core Spark
    final sparkPaint = Paint()..color = Colors.white.withOpacity(0.95);
    canvas.drawCircle(Offset(size.width * 0.5, size.height * 0.55), size.width * 0.03, sparkPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
