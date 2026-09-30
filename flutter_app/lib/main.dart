import 'package:flutter/material.dart';
import 'package:hireme_market/screens/home_screen.dart';
import 'package:hireme_market/screens/explore_screen.dart';
import 'package:hireme_market/screens/onboarding_screen.dart';
import 'package:hireme_market/screens/auth_screen.dart';
import 'package:hireme_market/theme/app_theme.dart';

void main() {
  runApp(const HireMeApp());
}

class HireMeApp extends StatelessWidget {
  const HireMeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HireMe Market',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainNavigationScreen(),
      routes: {
        '/onboarding': (context) => const OnboardingScreen(),
        '/auth': (context) => const AuthScreen(),
      },
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    ExploreScreen(),
    OnboardingScreen(),
    AuthScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = _currentIndex == 0;

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkBackground.withOpacity(0.95) : Colors.white.withOpacity(0.95),
          border: Border(
            top: BorderSide(
              color: isDark ? AppColors.darkOutlineVariant.withOpacity(0.3) : Colors.black.withOpacity(0.08),
            ),
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, Icons.home_filled, 'Home', isDark),
                _buildNavItem(1, Icons.explore, 'Explore', isDark),
                _buildNavItem(2, Icons.auto_awesome, 'Welcome', isDark),
                _buildNavItem(3, Icons.person, 'Profile', isDark),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label, bool isDark) {
    final isSelected = _currentIndex == index;
    final activeColor = isDark ? Colors.white : AppColors.brandIndigo;
    final inactiveColor = isDark ? AppColors.darkTextSecondary : const Color(0xFF94A3B8);

    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: isSelected ? activeColor : inactiveColor, size: 22),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? activeColor : inactiveColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
