import 'package:flutter/material.dart';
import 'package:hireme_market/theme/app_theme.dart';
import 'package:hireme_market/widgets/hireme_logo.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool isCreateRequest = true;
  String _selectedMapFilter = 'all';
  int _selectedMapProIndex = 0;
  bool _isRadarScanning = true;

  final List<Map<String, dynamic>> _vicinityProviders = const [
    {
      'name': 'Sreemathi S.',
      'role': 'Deep Home Cleaning',
      'category': 'cleaning',
      'rate': '₹199/hr',
      'rating': '4.9',
      'eta': '8 mins away',
      'distance': '1.2 km',
      'x': 0.32,
      'y': 0.36,
      'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRwogEjXFrhM46WVSdPk006C8-AnG4TyNMOudbDf1CVfTBb2cfhEVvWpa2TugrpBycsNTzuGJCSTvPt5WpqLwgx8WN-cPkfmAJjDrIPOkXB5Ifc3ezEnkHUWeBkY7QQ9dW1coLGVhDGgW2SlNab7lrTYNoPE0KYj_-JuAmOlp8e-BxJfY2X1zA0UCdCAXzfnHigrt8EFJAvFU4O7xT6mQyQt5plsJqNV3_zErg3LB-eZLTEC0ij8a9qw',
    },
    {
      'name': 'Rajeev Sharma',
      'role': 'Leak Fix & Fitments',
      'category': 'plumbing',
      'rate': '₹249/hr',
      'rating': '4.8',
      'eta': '14 mins away',
      'distance': '2.4 km',
      'x': 0.74,
      'y': 0.28,
      'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA99t9GCptx5Dy-5s5yueJRI0ALxrSifnFFXWXXn7ndqUaoH4K1jHcDfdVe4iXHbQtF4i6pDcRE8V-Og3AchJJSgSUK8Nf35JAvifZ85bkdewKwzVkBz4tq7p0owaHa9PBsDB1xxtSMRj_VCXn6qOuqB-hrAbr7m-ANcmD-KFHSajnx6Wp4WI-HymE9HzwpAw53VIjKN69aST4Jay6uGVIwIJDeNzvV1GHTQDwbPLsDxRto867POLRQrA',
    },
    {
      'name': 'Imran Qureshi',
      'role': 'Wiring & Inverters',
      'category': 'electric',
      'rate': '₹299/hr',
      'rating': '5.0',
      'eta': '5 mins away',
      'distance': '0.8 km',
      'x': 0.62,
      'y': 0.68,
      'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvMbd_wPOh6OI-qXrenocLLNOJqVP6Vmdt9ND4eYSA3ADJ07L5r7O4C9ndYMIuqqK5RLzupNKtN5gve6GL2fIBqd5dAgdUGA60Q41HPaFBBGSi7i6Ojo8LfpZu9XVlNjlmilMD_5hMwJjZ0FmIHGAlyvwnlLJJSpX57PnWU9KExenw2tFecUNjXc1rcqG-Cd7CUDqJyfLb2_MRR7JHrNtxPGtB60DeX21bn5ub63uydOslR_fL53fwdQ',
    },
    {
      'name': 'Elena Rostova',
      'role': 'Master Electrician',
      'category': 'electric',
      'rate': '\$42/hr',
      'rating': '4.9',
      'eta': '3 mins away',
      'distance': '0.4 mi',
      'x': 0.22,
      'y': 0.72,
      'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvyyAUj2R6uSAtSBMIDeGzlPKw8w_of9CUiylu11ugL5aiG_SDRfGcwoKj5XbQtx3T88BfhCIFpVhP2R4B_YKLmGmnY_NCHwlbKiiu0f5ghIVpXPoqmePGYsqoW_w2xuvYxn-uEReUC7JqYlf5UG37dKB-hcoL5US03luXYGECG4QAQV1v2-sWM5_ER7vTYkE66duDG-8Mm0t061U0h1jb-UUnDBVMQfiqISCD56odpOqwtpxFGqOsPQ',
    },
    {
      'name': 'David Vance',
      'role': 'Emergency Pipe Tech',
      'category': 'plumbing',
      'rate': '\$48/hr',
      'rating': '5.0',
      'eta': '11 mins away',
      'distance': '1.4 mi',
      'x': 0.82,
      'y': 0.76,
      'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyDi4hHCX1PO_kOCUmjcnprwdIs9-trM4qVQmSvjybPSMCaLoq6GaWygL-LUiQ6y_Wgm4v_6YJBXgnDtw98d55nJ0Czrlf7yg_1kHjt_6B20NLUs63uK4HEpKM1MLiPAODR7ZoeIj0By7ioOBT6g3ceIyIDRg4H2uNnj-nZh0peKXJ5fVUFXdGllaSE51uzV5h6dqqPeY6uD-iAtuwH90xabSt4_FTmEvB1344goEMhfpE8hNyQvCSWw',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: AppTheme.darkTheme,
      child: Scaffold(
        backgroundColor: AppColors.darkBackground,
        appBar: AppBar(
          backgroundColor: AppColors.darkBackground.withOpacity(0.95),
          titleSpacing: 16,
          title: Row(
            children: [
              const HireMeLogoWidget(size: 32),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Text(
                    'HIREME MARKET',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: AppColors.darkTextSecondary,
                      letterSpacing: 1.2,
                    ),
                  ),
                  Text(
                    'Home',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                      color: AppColors.darkTextPrimary,
                    ),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.search, color: AppColors.darkTextSecondary),
              onPressed: () {},
            ),
            Stack(
              children: [
                IconButton(
                  icon: const Icon(Icons.notifications_none, color: AppColors.darkTextSecondary),
                  onPressed: () {},
                ),
                Positioned(
                  right: 12,
                  top: 12,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Colors.redAccent,
                      shape: BoxShape.circle,
                    ),
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
            // Location Bar
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.darkSurfaceContainer,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.4)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.location_on, size: 18, color: AppColors.darkPrimary),
                      SizedBox(width: 8),
                      Text(
                        'Ghaziabad, Sector 12',
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                      ),
                      Icon(Icons.keyboard_arrow_down, size: 18, color: AppColors.darkTextSecondary),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.darkSurfaceContainer,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.4)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 6,
                        height: 6,
                        decoration: const BoxDecoration(
                          color: AppColors.brandRoseAccent,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 6),
                      const Text(
                        'Surge Active',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: AppColors.darkTextSecondary),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Dual Action Switcher
            Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: AppColors.darkSurfaceContainer,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.4)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => isCreateRequest = true),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: isCreateRequest ? AppColors.darkSurfaceBright : Colors.transparent,
                          borderRadius: BorderRadius.circular(12),
                          border: isCreateRequest
                              ? Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.6))
                              : null,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.bolt, size: 18, color: AppColors.darkPrimary),
                            SizedBox(width: 6),
                            Text('Create Request', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => isCreateRequest = false),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: !isCreateRequest ? AppColors.darkSurfaceBright : Colors.transparent,
                          borderRadius: BorderRadius.circular(12),
                          border: !isCreateRequest
                              ? Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.6))
                              : null,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.work_outline, size: 18, color: AppColors.darkTextSecondary),
                            SizedBox(width: 6),
                            Text('Accept Work', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 13, color: AppColors.darkTextSecondary)),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 18),

            // Hero Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Color(0xFF1F2330), Color(0xFF171A23)],
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.5)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.black26,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.4)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: const [
                        Icon(Icons.verified, size: 14, color: AppColors.brandEmerald),
                        SizedBox(width: 6),
                        Text('100% Background Verified Pros', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Everyday help,\none tap away.',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, height: 1.15),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Book vetted local specialists in minutes with zero upfront fees.',
                    style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary),
                  ),
                  const SizedBox(height: 16),
                  // Search Bar
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: const Color(0xFF0B0C12),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.5)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.search, size: 20, color: AppColors.darkTextSecondary),
                        const SizedBox(width: 8),
                        const Expanded(
                          child: TextField(
                            decoration: InputDecoration(
                              hintText: 'Search services, plumbers, cleaners...',
                              hintStyle: TextStyle(fontSize: 13, color: AppColors.darkTextSecondary),
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.mic, size: 18, color: AppColors.darkTextSecondary),
                          onPressed: () {},
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 18),

            // Live Vicinity Radar Map Widget
            _buildVicinityMapWidget(),
            const SizedBox(height: 24),

            // Popular Categories
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Popular Categories', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                Text('See All >', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _buildCategoryItem(Icons.cleaning_services, 'Cleaning', const Color(0xFFA5B4FC)),
                _buildCategoryItem(Icons.plumbing, 'Plumbing', const Color(0xFF7DD3FC)),
                _buildCategoryItem(Icons.electric_bolt, 'Electrician', const Color(0xFFFCD34D)),
                _buildCategoryItem(Icons.format_paint, 'Painting', const Color(0xFF5EEAD4)),
              ],
            ),
            const SizedBox(height: 24),

            // Recommended Near You
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Text('Recommended Near You', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                    SizedBox(width: 8),
                    Badge(label: Text('Active')),
                  ],
                ),
                const Text('Swipe →', style: TextStyle(fontSize: 12, color: AppColors.darkTextSecondary)),
              ],
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 260,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildWorkerCard(
                    name: 'Sreemathi S.',
                    service: 'Deep Home Cleaning',
                    price: '₹199/hr',
                    distance: '1.2 km',
                    rating: '4.9',
                    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRwogEjXFrhM46WVSdPk006C8-AnG4TyNMOudbDf1CVfTBb2cfhEVvWpa2TugrpBycsNTzuGJCSTvPt5WpqLwgx8WN-cPkfmAJjDrIPOkXB5Ifc3ezEnkHUWeBkY7QQ9dW1coLGVhDGgW2SlNab7lrTYNoPE0KYj_-JuAmOlp8e-BxJfY2X1zA0UCdCAXzfnHigrt8EFJAvFU4O7xT6mQyQt5plsJqNV3_zErg3LB-eZLTEC0ij8a9qw',
                  ),
                  const SizedBox(width: 12),
                  _buildWorkerCard(
                    name: 'Rajeev Sharma',
                    service: 'Leak Fix & Fitments',
                    price: '₹249/hr',
                    distance: '2.4 km',
                    rating: '4.8',
                    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA99t9GCptx5Dy-5s5yueJRI0ALxrSifnFFXWXXn7ndqUaoH4K1jHcDfdVe4iXHbQtF4i6pDcRE8V-Og3AchJJSgSUK8Nf35JAvifZ85bkdewKwzVkBz4tq7p0owaHa9PBsDB1xxtSMRj_VCXn6qOuqB-hrAbr7m-ANcmD-KFHSajnx6Wp4WI-HymE9HzwpAw53VIjKN69aST4Jay6uGVIwIJDeNzvV1GHTQDwbPLsDxRto867POLRQrA',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Active Conversations
            const Text('Active Conversations', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            _buildConversationTile(
              name: 'Ayesha K.',
              message: '"I\'m at the gate now, can you share the flat no?"',
              time: '1:42 PM',
              tag: 'Plumbing Job #412',
              unreadCount: 2,
              avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwjGgkyEDiCo012qtWN1suQMF7tGo_zdpStfgi_pBHSitzVm3CAEEhu2qu2YoXw2eqfz7mSVyuBcC5nS9fsW4YgBP3C0g7EHDYl7U2-IOga7hbAqE1tEXk_SZP_05KfYBPCOvkxcIBcIe4-1UNGWwhHuj5Z1d8TM63JZfjVTs1o6mZcn0bWzxYLzxn-POPtBNis0cvbmiEGECZKMBjzuh0mbrn96TepzeSwIqBxhXh2SJ-RlwbkdmqXA',
            ),
            const SizedBox(height: 16),

            // Protection Shield
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.darkSurfaceContainer,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.4)),
              ),
              child: Row(
                children: [
                  Icon(Icons.shield, color: AppColors.darkPrimary, size: 24),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('HireMe Protection Shield', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                        SizedBox(height: 2),
                        Text('Every task insured up to ₹10,000 with emergency resolution support.', style: TextStyle(fontSize: 11, color: AppColors.darkTextSecondary)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  static Widget _buildCategoryItem(IconData icon, String label, Color color) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.darkSurfaceContainer,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 6),
            Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500)),
          ],
        ),
      ),
    );
  }

  static Widget _buildWorkerCard({
    required String name,
    required String service,
    required String price,
    required String distance,
    required String rating,
    required String imageUrl,
  }) {
    return Container(
      width: 240,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.darkSurfaceContainer,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(imageUrl, height: 130, width: double.infinity, fit: BoxFit.cover),
              ),
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.7),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.near_me, size: 10, color: Colors.white70),
                      const SizedBox(width: 4),
                      Text(distance, style: const TextStyle(fontSize: 10, color: Colors.white)),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 8,
                left: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.8),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(price, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.white)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                  Text(service, style: const TextStyle(fontSize: 11, color: AppColors.darkTextSecondary)),
                ],
              ),
              Row(
                children: [
                  const Icon(Icons.star, color: Colors.amber, size: 14),
                  const SizedBox(width: 2),
                  Text(rating, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                ],
              ),
            ],
          ),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.darkSurfaceBright,
                foregroundColor: AppColors.darkTextPrimary,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              icon: const Icon(Icons.calendar_month, size: 16, color: AppColors.darkPrimary),
              label: const Text('Instant Book', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVicinityMapWidget() {
    final filtered = _vicinityProviders.where((p) {
      if (_selectedMapFilter == 'all') return true;
      return p['category'] == _selectedMapFilter;
    }).toList();

    final safeIndex = _selectedMapProIndex < filtered.length ? _selectedMapProIndex : 0;
    final activePro = filtered.isNotEmpty ? filtered[safeIndex] : null;

    return Container(
      decoration: BoxDecoration(
        color: AppColors.darkSurfaceContainer,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.5)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          // Map Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            color: const Color(0xFF161820),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: AppColors.brandEmeraldAccent,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'LIVE VICINITY RADAR',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1.1,
                            color: AppColors.darkTextSecondary,
                          ),
                        ),
                        Text(
                          'Ghaziabad, Sector 12 • ${filtered.length} active pros',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: AppColors.darkTextPrimary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                GestureDetector(
                  onTap: () => setState(() => _isRadarScanning = !_isRadarScanning),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: _isRadarScanning ? AppColors.darkPrimaryContainer.withOpacity(0.3) : const Color(0xFF232630),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.darkOutlineVariant),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.radar,
                          size: 13,
                          color: _isRadarScanning ? AppColors.darkPrimary : AppColors.darkTextSecondary,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          _isRadarScanning ? 'Scanning' : 'Paused',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                            color: _isRadarScanning ? AppColors.darkPrimary : AppColors.darkTextSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Category Filter Pills
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            color: const Color(0xFF1B1E28),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildMapFilterChip('All (${_vicinityProviders.length})', 'all'),
                  _buildMapFilterChip('Cleaning', 'cleaning'),
                  _buildMapFilterChip('Plumbing', 'plumbing'),
                  _buildMapFilterChip('Electrician', 'electric'),
                ],
              ),
            ),
          ),

          // Map Canvas Area
          Container(
            height: 220,
            width: double.infinity,
            color: const Color(0xFF0D0F15),
            child: Stack(
              children: [
                // Simulated Vector Roads and District Parks
                CustomPaint(
                  size: const Size.fromHeight(220),
                  painter: _VicinityMapPainter(),
                ),

                // Center User Location Beacon
                Align(
                  alignment: Alignment.center,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 18,
                        height: 18,
                        decoration: BoxDecoration(
                          color: AppColors.brandIndigo,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 2),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.brandIndigo.withOpacity(0.5),
                              blurRadius: 10,
                              spreadRadius: 4,
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 2),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(
                          color: Colors.black87,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: const Text(
                          'YOU',
                          style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                ),

                // Provider Pins
                for (int i = 0; i < filtered.length; i++)
                  Positioned(
                    left: filtered[i]['x'] * 340.0,
                    top: filtered[i]['y'] * 180.0,
                    child: GestureDetector(
                      onTap: () => setState(() => _selectedMapProIndex = i),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                        decoration: BoxDecoration(
                          color: _selectedMapProIndex == i ? AppColors.brandIndigo : const Color(0xFF1B1E28),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: _selectedMapProIndex == i ? Colors.white : AppColors.darkOutlineVariant,
                            width: _selectedMapProIndex == i ? 1.5 : 1.0,
                          ),
                          boxShadow: const [
                            BoxShadow(color: Colors.black45, blurRadius: 4, offset: Offset(0, 2)),
                          ],
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            CircleAvatar(
                              radius: 8,
                              backgroundImage: NetworkImage(filtered[i]['avatar']),
                            ),
                            const SizedBox(width: 4),
                            Text(
                              (filtered[i]['name'] as String).split(' ')[0],
                              style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white),
                            ),
                            const SizedBox(width: 3),
                            Text(
                              filtered[i]['eta'].toString().split(' ')[0],
                              style: const TextStyle(fontSize: 9, color: AppColors.darkPrimary, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                // Top right radar tag
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.65),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: Colors.white10),
                    ),
                    child: const Text(
                      'Radius: 2.5 km',
                      style: TextStyle(fontSize: 9, color: AppColors.darkTextSecondary, fontWeight: FontWeight.w500),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Selected Pro Action Tray
          if (activePro != null)
            Container(
              padding: const EdgeInsets.all(12),
              color: const Color(0xFF161820),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 20,
                    backgroundImage: NetworkImage(activePro['avatar']),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              activePro['name'],
                              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                            ),
                            const SizedBox(width: 4),
                            const Icon(Icons.star, size: 12, color: Colors.amber),
                            Text(
                              activePro['rating'],
                              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.amber),
                            ),
                          ],
                        ),
                        Text(
                          activePro['role'],
                          style: const TextStyle(fontSize: 10, color: AppColors.darkTextSecondary),
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Text(
                              activePro['rate'],
                              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.white),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              "${activePro['distance']} • ${activePro['eta']}",
                              style: const TextStyle(fontSize: 10, color: AppColors.darkPrimary),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.brandIndigo,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    icon: const Icon(Icons.bolt, size: 16),
                    label: const Text('Dispatch', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                    onPressed: () {},
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildMapFilterChip(String label, String value) {
    final isSelected = _selectedMapFilter == value;
    return GestureDetector(
      onTap: () => setState(() {
        _selectedMapFilter = value;
        _selectedMapProIndex = 0;
      }),
      child: Container(
        margin: const EdgeInsets.only(right: 6),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.brandIndigo : const Color(0xFF232630),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? AppColors.brandIndigo : AppColors.darkOutlineVariant.withOpacity(0.5),
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 10,
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            color: isSelected ? Colors.white : AppColors.darkTextSecondary,
          ),
        ),
      ),
    );
  }

  static Widget _buildConversationTile({
    required String name,
    required String message,
    required String time,
    required String tag,
    required int unreadCount,
    required String avatarUrl,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.darkSurfaceContainer,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkOutlineVariant.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 22,
            backgroundImage: NetworkImage(avatarUrl),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                    Text(time, style: const TextStyle(fontSize: 10, color: AppColors.darkTextSecondary)),
                  ],
                ),
                Text(message, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 11, color: AppColors.darkTextSecondary)),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.darkSurfaceContainerHigh,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(tag, style: const TextStyle(fontSize: 9, color: AppColors.darkTextSecondary)),
                ),
              ],
            ),
          ),
          if (unreadCount > 0)
            Container(
              margin: const EdgeInsets.only(left: 8),
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppColors.darkSurfaceBright,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.darkOutlineVariant),
              ),
              child: Text(
                '$unreadCount',
                style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
              ),
            ),
        ],
      ),
    );
  }
}

class _VicinityMapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Grid Lines
    final gridPaint = Paint()
      ..color = const Color(0xFF232838)
      ..strokeWidth = 0.8
      ..style = PaintingStyle.stroke;

    const step = 35.0;
    for (double x = 0; x < size.width; x += step) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), gridPaint);
    }
    for (double y = 0; y < size.height; y += step) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), gridPaint);
    }

    // Concentric Radar Rings from Center
    final center = Offset(size.width / 2, size.height / 2);
    final ringPaint = Paint()
      ..color = AppColors.brandIndigo.withOpacity(0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    canvas.drawCircle(center, 40, ringPaint);
    canvas.drawCircle(center, 80, ringPaint);

    // Green Park Zone
    final parkPaint = Paint()
      ..color = const Color(0xFF132420).withOpacity(0.7)
      ..style = PaintingStyle.fill;
    canvas.drawRRect(
      RRect.fromRectAndRadius(const Rect.fromLTWH(30, 40, 70, 50), const Radius.circular(8)),
      parkPaint,
    );

    // Market Zone
    final marketPaint = Paint()
      ..color = const Color(0xFF1A2234).withOpacity(0.8)
      ..style = PaintingStyle.fill;
    canvas.drawRRect(
      RRect.fromRectAndRadius(const Rect.fromLTWH(200, 50, 90, 45), const Radius.circular(8)),
      marketPaint,
    );

    // Arterial Roads
    final roadPaint = Paint()
      ..color = const Color(0xFF333A4D)
      ..strokeWidth = 4.0
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;

    final path1 = Path()
      ..moveTo(0, 80)
      ..quadraticBezierTo(size.width * 0.4, 110, size.width, 85);
    canvas.drawPath(path1, roadPaint);

    final path2 = Path()
      ..moveTo(size.width * 0.35, 0)
      ..quadraticBezierTo(size.width * 0.45, size.height * 0.5, size.width * 0.4, size.height);
    canvas.drawPath(path2, roadPaint);

    final path3 = Path()
      ..moveTo(size.width * 0.7, 0)
      ..quadraticBezierTo(size.width * 0.65, size.height * 0.6, size.width * 0.75, size.height);
    canvas.drawPath(path3, roadPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
