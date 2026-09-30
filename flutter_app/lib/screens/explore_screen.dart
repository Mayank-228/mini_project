import 'package:flutter/material.dart';
import 'package:hireme_market/theme/app_theme.dart';
import 'package:hireme_market/widgets/hireme_logo.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: AppTheme.lightTheme,
      child: Scaffold(
        backgroundColor: AppColors.lightBackground,
        appBar: AppBar(
          backgroundColor: Colors.white,
          titleSpacing: 16,
          title: Row(
            children: [
              const HireMeLogoWidget(size: 32),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'HIREME MARKET',
                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.brandIndigo, letterSpacing: 1.1),
                  ),
                  Text(
                    'Explore Categories',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.lightTextPrimary),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.search, color: AppColors.lightTextSecondary),
              onPressed: () {},
            ),
            Stack(
              children: [
                IconButton(
                  icon: const Icon(Icons.notifications_none, color: AppColors.lightTextSecondary),
                  onPressed: () {},
                ),
                Positioned(
                  right: 12,
                  top: 12,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(color: AppColors.brandRoseAccent, shape: BoxShape.circle),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(right: 16, left: 4),
              child: CircleAvatar(
                radius: 16,
                backgroundImage: const NetworkImage(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTJka0uaLSUuNr2XU1NzE6Vp0DZ9Aayd2tgT3sygwkJQonmNZnhqxGL-PwKaJg_ZNyFo93UflusHv2WOUiHp595OLLTM7-AquPIBlomV_cx8VuIZsNRKGrf_kf_bKhUdUFjweNByZML3X4oVtng5J9ZQfnVFbujwdhFncJvdz--ONHu0IArQI4m7Fl1GYwJazIK-nx1bUqmgnkxkdhycqSJzkPNRqIDoU0Md2PguIU8R0DhezM_0VFg',
                ),
              ),
            ),
          ],
        ),
        body: ListView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          children: [
            // Location breadcrumb
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.lightOutline),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.near_me, size: 16, color: AppColors.brandIndigo),
                      SizedBox(width: 6),
                      Text('Downtown Metro, Zone 4', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                      Icon(Icons.keyboard_arrow_down, size: 16, color: Colors.grey),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F5F9),
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.lightOutline),
                  ),
                  child: const Icon(Icons.map_outlined, size: 18, color: Colors.black87),
                ),
              ],
            ),
            const SizedBox(height: 14),

            // Motivation Banner
            RichText(
              text: const TextSpan(
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: AppColors.lightTextPrimary, height: 1.2),
                children: [
                  TextSpan(text: 'Everyday help,\n'),
                  TextSpan(text: 'one tap away.', style: TextStyle(color: AppColors.brandIndigo)),
                ],
              ),
            ),
            const SizedBox(height: 4),
            const Text('Book vetted neighborhood pros ready for dispatch today.', style: TextStyle(fontSize: 12, color: AppColors.lightTextSecondary)),
            const SizedBox(height: 14),

            // Search Bar & Filter
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    height: 46,
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.lightOutline),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.search, size: 20, color: Colors.grey),
                        SizedBox(width: 8),
                        Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                              hintText: "Search 'Emergency plumber' or 'De...",
                              hintStyle: TextStyle(fontSize: 13, color: Colors.grey),
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                        Icon(Icons.mic, size: 18, color: Colors.grey),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  width: 46,
                  height: 46,
                  decoration: BoxDecoration(
                    color: Colors.black87,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.tune, color: Colors.white, size: 20),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Filter Badges
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildFilterBadge('• Instant Booking', isSelected: true),
                  _buildFilterBadge('✓ Background Checked'),
                  _buildFilterBadge('⚡ Under \$45/hr'),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Popular Categories (2 cols x 3 rows)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(width: 4, height: 16, decoration: BoxDecoration(color: AppColors.brandIndigo, borderRadius: BorderRadius.all(Radius.circular(2)))),
                    SizedBox(width: 6),
                    Text('Popular Categories', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                  ],
                ),
                const Text('View all (18) →', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.brandIndigo)),
              ],
            ),
            const SizedBox(height: 12),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              childAspectRatio: 1.4,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              children: [
                _buildCategoryCard(Icons.cleaning_services, 'Home Cleaning', '184 Pros nearby', badgeText: 'Hot', badgeColor: AppColors.brandRose),
                _buildCategoryCard(Icons.plumbing, 'Plumbing Aid', '96 Pros nearby', hasDot: true),
                _buildCategoryCard(Icons.electrical_services, 'Electrician', '112 Pros nearby', badgeText: 'Surge', badgeColor: Colors.amber),
                _buildCategoryCard(Icons.local_shipping, 'Heavy Moving', '68 Pros nearby'),
                _buildCategoryCard(Icons.format_paint, 'Painting & Walls', '54 Pros nearby'),
                _buildCategoryCard(Icons.home_repair_service, 'Appliance Fix', '89 Pros nearby', badgeText: '24/7', badgeColor: Colors.grey),
              ],
            ),
            const SizedBox(height: 16),

            // Surge Guarantee
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF1F2),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFFECDD3)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('SURGE GUARANTEE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Color(0xFFBE123C))),
                        SizedBox(height: 2),
                        Text('Need assistance right now?', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: AppColors.lightTextPrimary)),
                        SizedBox(height: 2),
                        Text('Average dispatch responder time is 12 mins.', style: TextStyle(fontSize: 11, color: AppColors.lightTextSecondary)),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFE11D48),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    onPressed: () {},
                    child: const Text('Quick Call', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Featured Workers Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('Featured Verified Workers', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                Text('Top Rated in Area', style: TextStyle(fontSize: 12, color: AppColors.lightTextSecondary)),
              ],
            ),
            const SizedBox(height: 12),
            _buildProCard(
              name: 'Sreena Miller',
              role: 'Master Cleaning & Sanitize Expert',
              rate: '\$32/hr',
              rating: '4.9',
              completed: '188 tasks completed',
              availability: 'Available in 15 mins',
              imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlNvaBJM9xG25JbR2CMeYzX9tjWKWM_ob2r5NyI1uhq3NC0HTNVWJxa2wCsCj2oLh-0wxfvvv9IGF8Q0KjX4N08yo3A9Saq3cvxadPQ1krQI4V2y7JBdymNsHD-dvRt44eInN_y1PwXOnhN4xZdhpBub7ol7Tb4p2Z9I8oHX7De1CWBMxcbLN6bJA1TzhbDtnvjW7VGSIn__1Mtnga5SE_XjrlOQZ0-dvEiwLshtP7aWowPS_AOR_IOA',
            ),
            const SizedBox(height: 12),
            _buildProCard(
              name: 'David Vance',
              role: 'Emergency Pipe & Valve Technician',
              rate: '\$48/hr',
              rating: '5.0',
              completed: '242 tasks completed',
              availability: 'Available in 30 mins',
              imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyDi4hHCX1PO_kOCUmjcnprwdIs9-trM4qVQmSvjybPSMCaLoq6GaWygL-LUiQ6y_Wgm4v_6YJBXgnDtw98d55nJ0Czrlf7yg_1kHjt_6B20NLUs63uK4HEpKM1MLiPAODR7ZoeIj0By7ioOBT6g3ceIyIDRg4H2uNnj-nZh0peKXJ5fVUFXdGllaSE51uzV5h6dqqPeY6uD-iAtuwH90xabSt4_FTmEvB1344goEMhfpE8hNyQvCSWw',
            ),
            const SizedBox(height: 12),
            _buildProCard(
              name: 'Kenji Sato',
              role: 'Smart Wiring & Fuse Box Specialist',
              rate: '\$42/hr',
              rating: '4.8',
              completed: '95 tasks completed',
              availability: 'Available Today, 2 PM',
              imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL_CpT7uPzrojwHvKLZGlcWG34zqlQcaqO17gwXDqGE3xfDfZwctNRTcYmkC4x350EDyFyKc4N6kVKX4mXMooT1x68ZLBb8FMjUaHZLkbd6n7Py4_hi5C-Hr2djZZAf0_nEb5LeT7ICTfCLPt1ZZqFds-w34WOXOXr6NEYOclglxKJE-Ij-PiUkSP1oQi7h-j7CKvDBZ_BVA_tpLsStvOKqjXWRJtJLkDeXdITQTn_hTKqkde8KmAhrw',
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  static Widget _buildFilterBadge(String text, {bool isSelected = false}) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isSelected ? AppColors.brandIndigo : AppColors.lightOutline),
      ),
      child: Text(text, style: TextStyle(fontSize: 12, fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500, color: isSelected ? AppColors.brandIndigo : AppColors.lightTextPrimary)),
    );
  }

  static Widget _buildCategoryCard(IconData icon, String title, String subtitle, {String? badgeText, Color? badgeColor, bool hasDot = false}) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black.withOpacity(0.08)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: AppColors.brandIndigoLight,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, size: 20, color: AppColors.brandIndigo),
              ),
              if (badgeText != null)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: badgeColor?.withOpacity(0.12) ?? const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(badgeText, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: badgeColor ?? Colors.grey)),
                ),
              if (hasDot)
                Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppColors.brandEmerald, shape: BoxShape.circle)),
            ],
          ),
          const Spacer(),
          Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
          Text(subtitle, style: const TextStyle(fontSize: 10, color: AppColors.lightTextSecondary)),
        ],
      ),
    );
  }

  static Widget _buildProCard({
    required String name,
    required String role,
    required String rate,
    required String rating,
    required String completed,
    required String availability,
    required String imageUrl,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black.withOpacity(0.08)),
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(imageUrl, width: 52, height: 52, fit: BoxFit.cover),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                        Text(rate, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800)),
                      ],
                    ),
                    Text(role, style: const TextStyle(fontSize: 11, color: AppColors.lightTextSecondary)),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(Icons.star, size: 14, color: Colors.amber),
                        const SizedBox(width: 2),
                        Text(rating, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        const SizedBox(width: 6),
                        const Text('•', style: TextStyle(color: Colors.grey)),
                        const SizedBox(width: 6),
                        Text(completed, style: const TextStyle(fontSize: 10, color: AppColors.lightTextSecondary)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(height: 1),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.bolt, size: 14, color: AppColors.brandEmerald),
                    const SizedBox(width: 4),
                    Text(availability, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500)),
                  ],
                ),
              ),
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.chat_bubble_outline, size: 18),
                    onPressed: () {},
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.brandIndigo,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    onPressed: () {},
                    child: const Text('Book Now', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
