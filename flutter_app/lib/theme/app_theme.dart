import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  // Dark Theme Palette (Screen 1)
  static const Color darkBackground = Color(0xFF0F1117);
  static const Color darkSurface = Color(0xFF0F1117);
  static const Color darkSurfaceContainer = Color(0xFF1B1E28);
  static const Color darkSurfaceContainerHigh = Color(0xFF232630);
  static const Color darkSurfaceContainerHighest = Color(0xFF282C39);
  static const Color darkSurfaceBright = Color(0xFF2E323D);
  static const Color darkOutlineVariant = Color(0xFF343847);
  static const Color darkTextPrimary = Color(0xFFF1F3F9);
  static const Color darkTextSecondary = Color(0xFF9BA1B4);
  static const Color darkPrimary = Color(0xFFC4B5FD);
  static const Color darkPrimaryContainer = Color(0xFF4F46E5);
  static const Color darkSecondary = Color(0xFFF43F5E);

  // Light Theme Palette (Screens 2, 3, 4)
  static const Color lightBackground = Color(0xFFF8F9FC);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightSurfaceContainer = Color(0xFFEEF2F9);
  static const Color lightOutline = Color(0xFFCBD5E1);
  static const Color lightTextPrimary = Color(0xFF0F172A);
  static const Color lightTextSecondary = Color(0xFF64748B);
  static const Color brandIndigo = Color(0xFF4F46E5);
  static const Color brandIndigoLight = Color(0xFFEEF2FF);
  static const Color brandRose = Color(0xFFE11D48);
  static const Color brandRoseLight = Color(0xFFFFE4E6);
  static const Color brandRoseAccent = Color(0xFFF43F5E);
  static const Color brandEmerald = Color(0xFF10B981);
  static const Color brandEmeraldAccent = Color(0xFF10B981);
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.darkBackground,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.darkPrimary,
        surface: AppColors.darkSurface,
        onSurface: AppColors.darkTextPrimary,
        secondary: AppColors.darkSecondary,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.dark().textTheme,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.darkSurface,
        elevation: 0,
        centerTitle: false,
      ),
    );
  }

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.lightBackground,
      colorScheme: const ColorScheme.light(
        primary: AppColors.brandIndigo,
        surface: AppColors.lightSurface,
        onSurface: AppColors.lightTextPrimary,
        secondary: AppColors.brandRose,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.light().textTheme,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.lightSurface,
        elevation: 0,
        centerTitle: false,
      ),
    );
  }
}
