import 'package:flutter/material.dart';
import 'package:hireme_market/theme/app_theme.dart';
import 'package:hireme_market/widgets/hireme_logo.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool isSignIn = true;
  bool isObscured = true;
  bool keepMeActive = true;

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: AppTheme.lightTheme,
      child: Scaffold(
        backgroundColor: AppColors.lightBackground,
        body: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
            child: Column(
              children: [
                // Top Brand Icon with Bolt
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
                    child: HireMeLogoWidget(size: 48, withBoltBadge: true),
                  ),
                ),
                const SizedBox(height: 16),

                // Pill
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.black.withOpacity(0.08)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CircleAvatar(radius: 3, backgroundColor: AppColors.brandIndigo),
                      SizedBox(width: 6),
                      Text('ON-DEMAND GIGS & TALENT', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.lightTextSecondary, letterSpacing: 1.1)),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                // Welcome Back Title
                const Text(
                  'Welcome Back',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: AppColors.lightTextPrimary),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Log in to find verified gigs & top local talent instantly.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 13, color: AppColors.lightTextSecondary),
                ),
                const SizedBox(height: 20),

                // Segmented Pill
                Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: const Color(0xFFE2E8F0),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => isSignIn = true),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            decoration: BoxDecoration(
                              color: isSignIn ? Colors.white : Colors.transparent,
                              borderRadius: BorderRadius.circular(10),
                              boxShadow: isSignIn
                                  ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)]
                                  : null,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.login, size: 16, color: isSignIn ? AppColors.lightTextPrimary : AppColors.lightTextSecondary),
                                const SizedBox(width: 6),
                                Text('Sign In', style: TextStyle(fontWeight: isSignIn ? FontWeight.w700 : FontWeight.w500, fontSize: 13, color: isSignIn ? AppColors.lightTextPrimary : AppColors.lightTextSecondary)),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => isSignIn = false),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            decoration: BoxDecoration(
                              color: !isSignIn ? Colors.white : Colors.transparent,
                              borderRadius: BorderRadius.circular(10),
                              boxShadow: !isSignIn
                                  ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)]
                                  : null,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.person_add, size: 16, color: !isSignIn ? AppColors.lightTextPrimary : AppColors.lightTextSecondary),
                                const SizedBox(width: 6),
                                Text('Register', style: TextStyle(fontWeight: !isSignIn ? FontWeight.w700 : FontWeight.w500, fontSize: 13, color: !isSignIn ? AppColors.lightTextPrimary : AppColors.lightTextSecondary)),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Form Container
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.black.withOpacity(0.06)),
                    boxShadow: [
                      BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 4)),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Email / Phone Label
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Email or Phone', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                          Text('SMS login ready', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.brandIndigo)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF8FAFC),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.lightOutline),
                        ),
                        child: Row(
                          children: [
                            const Text('+91', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                            const Icon(Icons.keyboard_arrow_down, size: 16, color: Colors.grey),
                            const SizedBox(width: 8),
                            Container(width: 1, height: 20, color: AppColors.lightOutline),
                            const SizedBox(width: 8),
                            const Expanded(
                              child: TextField(
                                decoration: InputDecoration(
                                  hintText: 'name@work.com or 987...',
                                  hintStyle: TextStyle(fontSize: 13, color: Colors.grey),
                                  border: InputBorder.none,
                                ),
                              ),
                            ),
                            const Icon(Icons.badge_outlined, size: 18, color: Colors.grey),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Password Label
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Password', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                          Text('Forgot Password?', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.brandIndigo)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF8FAFC),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.lightOutline),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.lock_outline, size: 18, color: Colors.grey),
                            const SizedBox(width: 8),
                            Expanded(
                              child: TextField(
                                obscureText: isObscured,
                                decoration: const InputDecoration(
                                  hintText: '••••••••••••',
                                  hintStyle: TextStyle(fontSize: 13, color: Colors.grey),
                                  border: InputBorder.none,
                                ),
                              ),
                            ),
                            IconButton(
                              icon: Icon(isObscured ? Icons.visibility : Icons.visibility_off, size: 18, color: Colors.grey),
                              onPressed: () => setState(() => isObscured = !isObscured),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Keep active row
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Checkbox(
                                value: keepMeActive,
                                onChanged: (v) => setState(() => keepMeActive = v ?? true),
                                activeColor: AppColors.brandIndigo,
                              ),
                              const Text('Keep me active', style: TextStyle(fontSize: 12, color: AppColors.lightTextSecondary)),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: const Color(0xFFECFDF5),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: const Color(0xFFA7F3D0)),
                            ),
                            child: Row(
                              children: [
                                CircleAvatar(radius: 3, backgroundColor: AppColors.brandEmerald),
                                SizedBox(width: 4),
                                Text('Instant Gig Pass', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppColors.brandEmerald)),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      // Log In CTA
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
                              Text(isSignIn ? 'Log In' : 'Create Account', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                              const SizedBox(width: 6),
                              const Icon(Icons.arrow_forward, size: 16),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 18),

                      // Divider
                      Row(
                        children: [
                          Expanded(child: Divider()),
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 8),
                            child: Text('OR CONTINUE WITH', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: Colors.grey, letterSpacing: 0.8)),
                          ),
                          Expanded(child: Divider()),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Social Buttons
                      Row(
                        children: [
                          _buildSocialButton(Icons.g_mobiledata, 'Google'),
                          _buildSocialButton(Icons.apple, 'Apple'),
                          _buildSocialButton(Icons.phone_android, 'OTP'),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Micro Proof
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(Icons.verified_user, size: 14, color: Colors.grey),
                    SizedBox(width: 4),
                    Text('100% Verified', style: TextStyle(fontSize: 11, color: Colors.grey)),
                    SizedBox(width: 12),
                    Text('•', style: TextStyle(color: Colors.grey)),
                    SizedBox(width: 12),
                    Icon(Icons.bolt, size: 14, color: Colors.grey),
                    SizedBox(width: 4),
                    Text('60s Hiring', style: TextStyle(fontSize: 11, color: Colors.grey)),
                    SizedBox(width: 12),
                    Text('•', style: TextStyle(color: Colors.grey)),
                    SizedBox(width: 12),
                    Icon(Icons.lock_clock, size: 14, color: Colors.grey),
                    SizedBox(width: 4),
                    Text('Escrow Pay', style: TextStyle(fontSize: 11, color: Colors.grey)),
                  ],
                ),
                const SizedBox(height: 16),

                // Bottom Link
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('New to HireMe? ', style: TextStyle(fontSize: 12, color: AppColors.lightTextSecondary)),
                    GestureDetector(
                      onTap: () => setState(() => isSignIn = false),
                      child: const Text('Create an account ↗', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.brandIndigo)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static Widget _buildSocialButton(IconData icon, String label) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        height: 44,
        decoration: BoxDecoration(
          color: const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.lightOutline),
        ),
        child: Center(
          child: Icon(icon, size: 22, color: Colors.black87),
        ),
      ),
    );
  }
}
