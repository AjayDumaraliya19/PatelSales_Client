export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface SitemapGroup {
  title: string;
  links: { label: string; href: string; description?: string }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const companyLegalName = 'Patel Sales LLC';
export const lastUpdated = 'July 1, 2026';

export const privacyPolicySections: LegalSection[] = [
  {
    title: 'Introduction',
    paragraphs: [
      'Patel Sales LLC ("we," "us," or "our") operates the Patel Sales website and mobile application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our PWA app, create an account, or place wholesale orders.',
      'By using our services, you agree to the collection and use of information in accordance with this policy.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: ['We may collect the following types of information:'],
    list: [
      'Personal Information: name, email address, phone number, business name, billing and shipping addresses.',
      'Account Information: login credentials, order history, and business account preferences.',
      'Order Information: products purchased, quantities, payment method (processed securely by third-party providers), and delivery details.',
      'Technical Information: IP address, browser type, device information, and usage data collected via cookies and similar technologies.',
      'Communications: messages you send through our contact forms, email, or phone inquiries.',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: ['We use collected information to:'],
    list: [
      'Process and fulfill wholesale orders and deliveries.',
      'Create and manage your business account.',
      'Provide customer support and respond to inquiries.',
      'Send order confirmations, shipping updates, and account notifications.',
      'Improve our website, products, and services.',
      'Comply with legal obligations and prevent fraud.',
      'Send promotional offers (only with your consent; you may opt out at any time).',
    ],
  },
  {
    title: 'Information Sharing',
    paragraphs: [
      'We do not sell your personal information. We may share information with trusted third parties only when necessary:',
    ],
    list: [
      'Payment processors to complete transactions securely.',
      'Shipping and logistics partners to deliver your orders.',
      'Service providers who assist with website hosting, analytics, and email delivery.',
      'Law enforcement or regulatory authorities when required by law.',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.',
    ],
  },
  {
    title: 'Your Rights',
    paragraphs: ['Depending on your location, you may have the right to:'],
    list: [
      'Access, correct, or delete your personal information.',
      'Opt out of marketing communications.',
      'Request a copy of data we hold about you.',
      'Withdraw consent where processing is based on consent.',
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: [
      'For privacy-related questions or requests, contact us at info@patelsales.com or call (732) 762-7840. You may also write to: Patel Sales LLC, 102-103 North Center Dr, North Brunswick, NJ 08902.',
    ],
  },
];

export const termsOfServiceSections: LegalSection[] = [
  {
    title: 'Agreement to Terms',
    paragraphs: [
      'These Terms of Service ("Terms") govern your use of the Patel Sales LLC website, mobile app, and wholesale ordering services. By accessing or using our services, you agree to be bound by these Terms.',
    ],
  },
  {
    title: 'Eligibility & Business Accounts',
    paragraphs: [
      'Our services are intended for food service businesses, restaurants, delis, bakeries, caterers, and commercial buyers. You must be at least 18 years old and authorized to make purchases on behalf of your business.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
    ],
  },
  {
    title: 'Products & Pricing',
    paragraphs: [
      'All products are subject to availability. Wholesale prices, case sizes, and bulk discounts may vary. We reserve the right to correct pricing errors and to limit quantities.',
      'Product images are for illustration purposes. Actual packaging may vary by manufacturer batch.',
    ],
  },
  {
    title: 'Orders & Payment',
    paragraphs: [
      'Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Payment is due at checkout unless you have an approved business credit account.',
      'Orders over $150 qualify for free shipping in NJ, NY, CT, and PA. Other areas may incur shipping fees calculated at checkout.',
    ],
  },
  {
    title: 'Shipping & Delivery',
    paragraphs: [
      'Estimated delivery times are provided at checkout but are not guaranteed. Risk of loss passes to you upon delivery to the carrier or your designated address.',
      'See our Shipping Policy for full details on delivery areas, timelines, and freight handling.',
    ],
  },
  {
    title: 'Returns & Refunds',
    paragraphs: [
      'Returns are accepted within 30 days for unopened, unused products in original packaging. Custom or special-order items may not be returnable.',
      'See our Returns & Exchanges Policy for complete return procedures and restocking fees.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, Patel Sales LLC shall not be liable for indirect, incidental, special, or consequential damages arising from your use of our services or products.',
      'Our total liability for any claim shall not exceed the amount you paid for the specific order giving rise to the claim.',
    ],
  },
  {
    title: 'Governing Law',
    paragraphs: [
      'These Terms are governed by the laws of the State of New Jersey, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Middlesex County, New Jersey.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Questions about these Terms? Contact info@patelsales.com or (732) 762-7840.',
    ],
  },
];

export const shippingPolicySections: LegalSection[] = [
  {
    title: 'Delivery Areas',
    paragraphs: [
      'Patel Sales delivers throughout New Jersey and to select areas in New York, Connecticut, and Pennsylvania. Local pickup is available at our North Brunswick warehouse during business hours.',
    ],
  },
  {
    title: 'Free Shipping',
    paragraphs: [
      'Orders of $150 or more qualify for free standard shipping within NJ, NY, CT, and PA. Orders below $150 incur a flat shipping fee of $12.99 at checkout.',
    ],
  },
  {
    title: 'Processing Time',
    paragraphs: [
      'Most in-stock orders are processed within 1–2 business days. Large bulk orders or items requiring special sourcing may take 3–5 business days. You will receive an email confirmation when your order ships.',
    ],
  },
  {
    title: 'Delivery Timeframes',
    paragraphs: ['Estimated delivery times after shipment:'],
    list: [
      'New Jersey (local): 1–2 business days',
      'NY, CT, PA (regional): 2–4 business days',
      'Other states: 5–7 business days (where available)',
    ],
  },
  {
    title: 'Freight & Large Orders',
    paragraphs: [
      'Pallet orders and oversized freight shipments are quoted separately. Contact our team for bulk freight pricing on orders exceeding 20 cases or 500 lbs.',
    ],
  },
  {
    title: 'Order Tracking',
    paragraphs: [
      'Once shipped, you will receive a tracking number via email. Track your order anytime at our Track Order page using your order number and email.',
    ],
  },
];

export const returnsPolicySections: LegalSection[] = [
  {
    title: 'Return Window',
    paragraphs: [
      'We accept returns within 30 days of delivery for most unopened, unused products in original manufacturer packaging. Opened or used food service items cannot be returned for health and safety reasons.',
    ],
  },
  {
    title: 'Eligible Items',
    paragraphs: ['Returns are accepted for:'],
    list: [
      'Unopened cases in original packaging.',
      'Defective or damaged items (report within 7 days of delivery with photos).',
      'Incorrect items shipped (we will provide a prepaid return label).',
    ],
  },
  {
    title: 'Non-Returnable Items',
    paragraphs: ['The following cannot be returned:'],
    list: [
      'Opened food contact items (cups, containers, gloves, etc.).',
      'Custom or special-order products.',
      'Clearance or final-sale items marked as non-returnable.',
    ],
  },
  {
    title: 'How to Start a Return',
    paragraphs: [
      'Contact us at info@patelsales.com or (732) 762-7840 with your order number and reason for return. Our team will provide return authorization and instructions. Unauthorized returns may not be accepted.',
    ],
  },
  {
    title: 'Refunds',
    paragraphs: [
      'Approved returns are refunded to the original payment method within 5–10 business days after we receive and inspect the items. Shipping costs are non-refundable unless the return is due to our error.',
    ],
  },
  {
    title: 'Exchanges',
    paragraphs: [
      'Need a different size or product? Contact us within 30 days. Exchanges are subject to product availability. Price differences will be charged or refunded accordingly.',
    ],
  },
];

export const cookiePolicySections: LegalSection[] = [
  {
    title: 'What Are Cookies',
    paragraphs: [
      'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, keep you logged in, and understand how you use our site.',
    ],
  },
  {
    title: 'Cookies We Use',
    paragraphs: ['We use the following types of cookies:'],
    list: [
      'Essential Cookies: Required for cart, login, and checkout functionality.',
      'Preference Cookies: Remember your settings and display preferences.',
      'Analytics Cookies: Help us understand site traffic and improve user experience.',
      'PWA Cookies: Enable offline caching and app installation features.',
    ],
  },
  {
    title: 'Managing Cookies',
    paragraphs: [
      'You can control cookies through your browser settings. Disabling essential cookies may affect cart and checkout functionality. Our PWA may use local storage for offline features.',
    ],
  },
  {
    title: 'Third-Party Cookies',
    paragraphs: [
      'We may use third-party analytics and payment providers that set their own cookies. Please review their privacy policies for more information.',
    ],
  },
];

export const businessAccountsSections: LegalSection[] = [
  {
    title: 'Who Qualifies',
    paragraphs: [
      'Business accounts are available to restaurants, delis, bakeries, caterers, hotels, convenience stores, and other commercial food service operations in New Jersey and surrounding states.',
    ],
  },
  {
    title: 'Benefits',
    paragraphs: ['Business account holders enjoy:'],
    list: [
      'Wholesale pricing on bulk case quantities.',
      'Order history and quick reorder.',
      'Dedicated account support.',
      'Net-30 payment terms (subject to credit approval).',
      'Priority processing for recurring orders.',
    ],
  },
  {
    title: 'How to Apply',
    paragraphs: [
      'Create an account online or contact our sales team with your business name, EIN or tax ID, and estimated monthly order volume. Applications are typically reviewed within 2 business days.',
    ],
  },
];

export const wholesaleFlyerSections: LegalSection[] = [
  {
    title: 'Current Wholesale Flyer',
    paragraphs: [
      'Browse our latest wholesale deals on foam products, foil pans, plastic containers, paper bags, eco-friendly packaging, and disposable gloves. Prices shown are per case unless otherwise noted.',
    ],
  },
  {
    title: 'How to Order from the Flyer',
    paragraphs: [
      'Add items to your cart online or call (732) 762-7840 with flyer item numbers. Mention "Wholesale Flyer" when ordering by phone for promotional pricing.',
    ],
  },
  {
    title: 'Flyer Terms',
    paragraphs: [
      'Flyer prices are valid while supplies last. Cannot be combined with other offers unless stated. Free shipping applies to qualifying orders over $150 in NJ, NY, CT, and PA.',
    ],
  },
];

export const sitemapGroups: SitemapGroup[] = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/', description: 'Wholesale food service supplies' },
      { label: 'Shop All Products', href: '/products' },
      { label: 'Shop Disposables', href: '/products' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Get the App', href: '/get-the-app' },
    ],
  },
  {
    title: 'Account & Orders',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'My Account', href: '/account' },
      { label: 'Order History', href: '/account/orders' },
      { label: 'Shopping Cart', href: '/cart' },
      { label: 'Checkout', href: '/checkout' },
      { label: 'Track Order', href: '/track-order' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Bulk Order Inquiry', href: '/bulk-order' },
      { label: 'Business Accounts', href: '/business-accounts' },
    ],
  },
  {
    title: 'Wholesale',
    links: [
      { label: 'Wholesale Flyer', href: '/wholesale-flyer' },
      { label: 'Business Accounts', href: '/business-accounts' },
      { label: 'Bulk Order', href: '/bulk-order' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    category: 'Orders',
    question: 'What is the minimum order amount?',
    answer: 'There is no minimum order amount. Free shipping applies to orders of $150 or more in NJ, NY, CT, and PA.',
  },
  {
    category: 'Orders',
    question: 'How do I track my order?',
    answer: 'Visit our Track Order page and enter your order number and email. You will also receive tracking information by email when your order ships.',
  },
  {
    category: 'Orders',
    question: 'Can I modify or cancel an order?',
    answer: 'Contact us within 2 hours of placing your order at (732) 762-7840. Once an order is processed for shipping, modifications may not be possible.',
  },
  {
    category: 'Shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes. Orders over $150 ship free within NJ, NY, CT, and PA. Orders below $150 have a $12.99 flat shipping fee.',
  },
  {
    category: 'Shipping',
    question: 'Do you deliver outside New Jersey?',
    answer: 'Yes, we deliver to NY, CT, PA, and select other areas. Delivery times vary by location.',
  },
  {
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'Unopened products in original packaging may be returned within 30 days. Opened food contact items cannot be returned. See our Returns Policy for details.',
  },
  {
    category: 'Account',
    question: 'How do I open a business account?',
    answer: 'Register online or visit our Business Accounts page. For net-30 terms, contact our sales team with your business information.',
  },
  {
    category: 'Products',
    question: 'Are your products FDA compliant?',
    answer: 'Yes. All food contact disposable products we sell meet applicable FDA requirements for food service use.',
  },
  {
    category: 'Products',
    question: 'Do you sell by the case only?',
    answer: 'Most items are sold by the case for wholesale pricing. Case sizes are listed on each product page.',
  },
  {
    category: 'General',
    question: 'Can I pick up my order at your warehouse?',
    answer: 'Yes. Walk-in pickup is available at 102-103 North Center Dr, North Brunswick, NJ during business hours. Call ahead for large orders.',
  },
];
