export type ContentItem = {
  section: string;
  itemKey: string;
  title: string;
  subtitle?: string;
  body?: string;
  value?: string;
  imageUrl?: string;
  linkUrl?: string;
  metadata?: Record<string, unknown>;
  sortOrder?: number;
  isActive?: boolean;
};

export const contentDefaults: ContentItem[] = [
  { section: "home_stats", itemKey: "students_placed", title: "Students Placed", value: "5000+", sortOrder: 1 },
  { section: "home_stats", itemKey: "partner_universities", title: "Partner Universities", value: "50+", sortOrder: 2 },
  { section: "home_stats", itemKey: "countries", title: "Countries", value: "20+", sortOrder: 3 },
  { section: "home_stats", itemKey: "visa_success_rate", title: "Visa Success Rate", value: "98%", sortOrder: 4 },
  { section: "about_stats", itemKey: "years_experience", title: "Years of Experience", value: "15+", sortOrder: 1 },
  { section: "about_stats", itemKey: "students_placed", title: "Students Placed", value: "5000+", sortOrder: 2 },
  { section: "about_stats", itemKey: "partner_universities", title: "Partner Universities", value: "50+", sortOrder: 3 },
  { section: "about_stats", itemKey: "countries_covered", title: "Countries Covered", value: "20+", sortOrder: 4 },
  { section: "how_it_works", itemKey: "free_counselling", title: "Free Counselling", subtitle: "Initial consultation", value: "1", metadata: { icon: "comments" }, sortOrder: 1 },
  { section: "how_it_works", itemKey: "choose_university", title: "Choose University", subtitle: "Select your dream school", value: "2", metadata: { icon: "building" }, sortOrder: 2 },
  { section: "how_it_works", itemKey: "application", title: "Application", subtitle: "Complete your application", value: "3", metadata: { icon: "file" }, sortOrder: 3 },
  { section: "how_it_works", itemKey: "visa_depart", title: "Visa & Depart", subtitle: "Get visa and travel", value: "4", metadata: { icon: "plane" }, sortOrder: 4 },
  { section: "service_process", itemKey: "initial_consultation", title: "Initial Consultation", body: "Meet with our counselors to discuss your goals", value: "1", sortOrder: 1 },
  { section: "service_process", itemKey: "profile_assessment", title: "Profile Assessment", body: "Evaluate your academic and professional background", value: "2", sortOrder: 2 },
  { section: "service_process", itemKey: "university_selection", title: "University Selection", body: "Shortlist universities matching your profile", value: "3", sortOrder: 3 },
  { section: "service_process", itemKey: "application_preparation", title: "Application Preparation", body: "Prepare all required documents and essays", value: "4", sortOrder: 4 },
  { section: "service_process", itemKey: "application_submission", title: "Application Submission", body: "Submit applications to selected universities", value: "5", sortOrder: 5 },
  { section: "service_process", itemKey: "visa_departure", title: "Visa & Departure", body: "Complete visa process and prepare for departure", value: "6", sortOrder: 6 },
  { section: "journey", itemKey: "founded", title: "Company Founded", body: "Started with a vision to help Bangladeshi students study abroad", value: "2009", sortOrder: 1 },
  { section: "journey", itemKey: "first_100", title: "First 100 Students", body: "Reached milestone of 100 successful placements", value: "2012", sortOrder: 2 },
  { section: "journey", itemKey: "expansion", title: "International Expansion", body: "Opened offices in UK and Canada", value: "2015", sortOrder: 3 },
  { section: "journey", itemKey: "partner_network", title: "Partner Network", body: "Established partnerships with 50+ universities", value: "2018", sortOrder: 4 },
  { section: "journey", itemKey: "students_5000", title: "5000+ Students", body: "Celebrated 5000 successful student placements", value: "2021", sortOrder: 5 },
  { section: "journey", itemKey: "industry_leader", title: "Industry Leader", body: "Recognized as leading education consultancy in South Asia", value: "2024", sortOrder: 6 },
  { section: "about_overview", itemKey: "main", title: "About Rowshanara Edu", body: "Founded in 2009, we've been helping Bangladeshi students achieve their dreams of studying abroad. With 15+ years of experience and 5000+ successful placements, we're the trusted partner for your international education journey.", subtitle: "Transforming Lives Through Global Education", metadata: { highlights: ["50+ Partner Universities", "20+ Countries Covered", "98% Visa Success Rate"], quote: "Our commitment is to provide world-class guidance and support to every student we work with." }, sortOrder: 1 },
  { section: "mission_vision_values", itemKey: "mission", title: "Mission", body: "To empower Bangladeshi students with world-class education opportunities and guidance for their international academic journey.", imageUrl: "/images/about/mission.png", sortOrder: 1 },
  { section: "mission_vision_values", itemKey: "vision", title: "Vision", body: "To be the most trusted and innovative education consultancy, transforming lives through global education.", imageUrl: "/images/about/vision.png", sortOrder: 2 },
  { section: "mission_vision_values", itemKey: "values", title: "Values", body: "Integrity, Excellence, Student-Centric Approach, and Continuous Innovation in everything we do.", imageUrl: "/images/about/values.png", sortOrder: 3 },
  { section: "team", itemKey: "karim", title: "Dr. Md. Karim Hassan", subtitle: "Founder & CEO", body: "Education Strategy", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=300&fit=crop", sortOrder: 1 },
  { section: "team", itemKey: "fatima", title: "Fatima Ahmed Khan", subtitle: "Head of Admissions", body: "University Relations", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=300&fit=crop", sortOrder: 2 },
  { section: "team", itemKey: "amir", title: "Amir Hossain", subtitle: "Visa Specialist", body: "Immigration Law", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=300&fit=crop", sortOrder: 3 },
  { section: "why_choose_us", itemKey: "expert_guidance", title: "Expert Guidance", body: "Our team has 15+ years of experience in international education.", metadata: { icon: "graduation" }, sortOrder: 1 },
  { section: "why_choose_us", itemKey: "track_record", title: "Proven Track Record", body: "5000+ successful placements with 98% visa success rate.", metadata: { icon: "award" }, sortOrder: 2 },
  { section: "why_choose_us", itemKey: "personalized", title: "Personalized Service", body: "Customized guidance tailored to each student's unique profile.", metadata: { icon: "user" }, sortOrder: 3 },
  { section: "why_choose_us", itemKey: "network", title: "Strong Network", body: "Partnerships with 50+ universities across 20+ countries.", metadata: { icon: "globe" }, sortOrder: 4 },
  { section: "why_choose_us", itemKey: "pricing", title: "Affordable Pricing", body: "Competitive rates with flexible payment options available.", metadata: { icon: "money" }, sortOrder: 5 },
  { section: "why_choose_us", itemKey: "support", title: "Continuous Support", body: "Support from application through post-arrival assistance.", metadata: { icon: "support" }, sortOrder: 6 },
  { section: "success_stories", itemKey: "fatima", title: "Fatima Ahmed", subtitle: "University of Toronto", body: "\"Global Study Pathways made my dream of studying abroad a reality. Their guidance was invaluable!\"", imageUrl: "/fatima.png", metadata: { country: "Bangladesh" }, sortOrder: 1 },
  { section: "success_stories", itemKey: "karim", title: "Karim Hassan", subtitle: "University of Melbourne", body: "\"Professional, efficient, and genuinely caring team. Highly recommended!\"", imageUrl: "/karim.png", metadata: { country: "Bangladesh" }, sortOrder: 2 },
  { section: "success_stories", itemKey: "aisha", title: "Aisha Khan", subtitle: "London School of Economics", body: "\"Best decision I made was choosing Global Study Pathways. Worth every penny!\"", imageUrl: "/aisha.png", metadata: { country: "Bangladesh" }, sortOrder: 3 },
  { section: "trusted_universities", itemKey: "sydney", title: "University of Sydney", sortOrder: 1 },
  { section: "trusted_universities", itemKey: "toronto", title: "University of Toronto", sortOrder: 2 },
  { section: "trusted_universities", itemKey: "oxford", title: "Oxford University", sortOrder: 3 },
  { section: "trusted_universities", itemKey: "melbourne", title: "University of Melbourne", sortOrder: 4 },
  { section: "trusted_universities", itemKey: "harvard", title: "Harvard University", sortOrder: 5 },
  { section: "contact_information", itemKey: "address", title: "Office Address", body: "Dhaka Office:\nMNSN Tower, 60 Dilkusha\nDhaka 1000, Bangladesh", metadata: { icon: "location" }, sortOrder: 1 },
  { section: "contact_information", itemKey: "phones", title: "Phone Numbers", body: "Bangladesh: +880 1511-710730", metadata: { icon: "phone" }, sortOrder: 2 },
  { section: "contact_information", itemKey: "email", title: "Email Address", body: "info@rowshanaraedu.com", metadata: { icon: "email" }, sortOrder: 3 },
  { section: "contact_information", itemKey: "hours", title: "Office Hours", body: "Saturday - Wednesday: 10:00 AM - 7:00 PM\nThursday: 10:00 AM - 6:00 PM\nFriday: Closed\nSunday: 10:00 AM - 7:00 PM", metadata: { icon: "clock" }, sortOrder: 4 },
  { section: "contact_information", itemKey: "whatsapp", title: "Chat on WhatsApp", value: "+8801511710730", linkUrl: "https://wa.me/8801511710730", metadata: { icon: "whatsapp" }, sortOrder: 5 },
  { section: "location", itemKey: "map", title: "Our Location", linkUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.1574144561273!2d90.4401676855508!3d23.706072035573392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b74097c9ee29%3A0x4ed71eb5b2894d99!2sColor%20Hut!5e0!3m2!1sen!2sbd!4v1779648925770!5m2!1sen!2sbd", sortOrder: 1 },
];
