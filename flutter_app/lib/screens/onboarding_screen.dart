import 'package:flutter/material.dart';
import 'package:hireme_market/theme/app_theme.dart';
import 'package:hireme_market/widgets/hireme_logo.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: AppTheme.lightTheme,
      child: Scaffold(
        backgroundColor: AppColors.lightBackground,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            child: Column(
              children: [
                // Top Status Badges
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.black.withOpacity(0.08)),
                        boxShadow: [
                          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 4, offset: const Offset(0, 2)),
                        ],
                      ),
                      child: Row(
                        children: [
                          Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppColors.brandEmerald, shape: BoxShape.circle)),
                          const SizedBox(width: 8),
                          const Text('2,410+ PROS ONLINE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.lightTextPrimary)),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.black.withOpacity(0.08)),
                        boxShadow: [
                          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 4, offset: const Offset(0, 2)),
                        ],
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.verified, size: 14, color: AppColors.brandIndigo),
                          SizedBox(width: 6),
                          Text('Top Rated 4.9/5', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.lightTextPrimary)),
                        ],
                      ),
                    ),
                  ],
                ),
                const Spacer(),

                // Brand Icon
                Container(
                  width: 64,
                  height: 64,
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.black.withOpacity(0.08)),
                    boxShadow: [
                      BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 4)),
                    ],
                  ),
                  child: const Center(
                    child: HireMeLogoWidget(size: 48),
                  ),
                ),
                const SizedBox(height: 16),

                // Pill
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.brandIndigoLight,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Icon(Icons.bolt, size: 15, color: AppColors.brandIndigo),
                      SizedBox(width: 6),
                      Text('Instant Gig & Home Services', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.brandIndigo)),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                // Headline
                RichText(
                  textAlign: TextAlign.center,
                  text: const TextSpan(
                    style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: AppColors.lightTextPrimary, height: 1.2),
                    children: [
                      TextSpan(text: 'Everyday help,\n'),
                      TextSpan(text: 'one tap away.', style: TextStyle(color: AppColors.brandIndigo)),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Trusted help, right when you need it. High-velocity matching with vetted professionals in minutes.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 12, color: AppColors.lightTextSecondary, height: 1.4),
                ),
                const SizedBox(height: 24),

                // 3 Benefit Cards
                Row(
                  children: [
                    _buildPillarCard(Icons.verified, 'Verified', 'Background checked'),
                    _buildPillarCard(Icons.speed, 'Instant', '< 90s avg match'),
                    _buildPillarCard(Icons.shield, 'Escrow', '100% guarantee'),
                  ],
                ),
                const SizedBox(height: 16),

                // Live Dispatch Card
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.black.withOpacity(0.08)),
                    boxShadow: [
                      BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 6, offset: const Offset(0, 2)),
                    ],
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('LIVE DISPATCH', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.lightTextSecondary, letterSpacing: 1.1)),
                          Row(
                            children: [
                              CircleAvatar(radius: 3, backgroundColor: AppColors.brandIndigo),
                              SizedBox(width: 6),
                              Text('Surge active', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.brandIndigo)),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF8FAFC),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.black.withOpacity(0.05)),
                        ),
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Image.network(
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuCvyyAUj2R6uSAtSBMIDeGzlPKw8w_of9CUiylu11ugL5aiG_SDRfGcwoKj5XbQtx3T88BfhCIFpVhP2R4B_YKLmGmnY_NCHwlbKiiu0f5ghIVpXPoqmePGYsqoW_w2xuvYxn-uEReUC7JqYlf5UG37dKB-hcoL5US03luXYGECG4QAQV1v2-sWM5_ER7vTYkE66duDG-8Mm0t061U0h1jb-UUnDBVMQfiqISCD56odpOqwtpxFGqOsPQ',
                                width: 40,
                                height: 40,
                                fit: BoxFit.cover,
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Elena Rostova ✓', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                                  Text('Master Electrician • 0.4 mi away', style: TextStyle(fontSize: 10, color: AppColors.lightTextSecondary)),
                                ],
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('\$42/hr', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                                Text('Available', style: TextStyle(fontSize: 10, color: Colors.green, fontWeight: FontWeight.w600)),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Text('Avatars +48', style: TextStyle(fontSize: 10, color: AppColors.lightTextSecondary)),
                          Text('booked in your district today', style: TextStyle(fontSize: 10, color: AppColors.lightTextSecondary)),
                        ],
                      ),
                    ],
                  ),
                ),
                const Spacer(),

                // Action Buttons
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.brandIndigo,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: () {},
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Get Started', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                        SizedBox(width: 6),
                        Icon(Icons.arrow_forward, size: 16),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Text('Already have an account? ', style: TextStyle(fontSize: 12, color: AppColors.lightTextSecondary)),
                    Text('Sign In', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.brandIndigo)),
                  ],
                ),
                const SizedBox(height: 6),
                const Text(
                  'By continuing, you agree to HireMe\'s Terms of Service • Protected by Escrow Shield',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 10, color: AppColors.lightTextSecondary),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static Widget _buildPillarCard(IconData icon, String title, String subtitle) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.black.withOpacity(0.06)),
        ),
        child: Column(
          children: [
            Icon(icon, color: AppColors.brandIndigo, size: 20),
            const SizedBox(height: 6),
            Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
            const SizedBox(height: 2),
            Text(subtitle, textAlign: TextAlign.center, style: const TextStyle(fontSize: 9, color: AppColors.lightTextSecondary)),
          ],
        ),
      ),
    );
  }
}
