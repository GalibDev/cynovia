update public.categories
set image_url = category_images.image_url
from (
  values
    ('industrial-machinery', '/images/products/1781407405982.jpeg'),
    ('food-processing-equipment', '/images/products/1781265527362.jpeg'),
    ('medical-supplies-reagents', '/images/products/1782717193173.jpeg'),
    ('printing-supplies', '/images/products/1781457361815.jpeg'),
    ('fashion', '/images/products/1781368026884.jpeg'),
    ('home-textiles', '/images/products/1782744308829.jpeg'),
    ('home-appliances', '/images/products/1781592153967.jpeg'),
    ('kitchen-accessories', '/images/products/1781508580490.jpeg'),
    ('gadgets-electronics', '/images/products/1783009613418.jpeg'),
    ('kids-corner', '/images/products/1781689912099.jpeg'),
    ('gift-corner', '/images/products/1781838841047.jpeg')
) as category_images(slug, image_url)
where public.categories.slug = category_images.slug;

delete from public.products;

insert into public.products (category_id, name, slug, description, image_url, sort_order, is_featured)
select categories.id, products.name, products.slug, products.description, products.image_url, products.sort_order, products.is_featured
from (
  values
    ('food-processing-equipment', 'Premium Ice Cube Making Machine', 'premium-ice-cube-making-machine', 'Commercial ice cube maker for cafes, restaurants, juice bars, and event service counters.', '/images/products/1781265527362.jpeg', 1, true),
    ('food-processing-equipment', 'Soft Serve Ice Cream Machine', 'soft-serve-ice-cream-machine', 'Countertop soft serve ice cream machine for dessert shops, kiosks, and food courts.', '/images/products/1781025892905.jpeg', 2, true),
    ('food-processing-equipment', 'Premium Ice Cream Machine', 'premium-ice-cream-machine', 'High-output ice cream machine for smooth cones, sundaes, and dessert counter operations.', '/images/products/1781621990654.jpeg', 3, true),
    ('food-processing-equipment', 'Juice Making Machine', 'juice-making-machine', 'Commercial juice making machine for fresh beverage preparation in shops and restaurants.', '/images/products/1782058139505.jpeg', 4, true),
    ('food-processing-equipment', 'Commercial Pressure Fryer', 'commercial-pressure-fryer', 'Stainless steel pressure fryer for fast, juicy, and consistent fried chicken production.', '/images/products/1781508580490.jpeg', 5, true),
    ('industrial-machinery', 'Professional Feed Pellet Mill', 'professional-feed-pellet-mill', 'Efficient feed pellet mill for poultry, fish, and animal feed production.', '/images/products/1781407405982.jpeg', 6, true),
    ('industrial-machinery', 'Animal Feed Pellet Machine', 'animal-feed-pellet-machine', 'Compact feed pellet machinery package for small manufacturing and farm operations.', '/images/products/1781713101296.jpeg', 7, true),
    ('printing-supplies', 'Kexin Premium Cutting Wheels', 'kexin-premium-cutting-wheels', 'Durable resin cutting wheels for metal work, fabrication, and workshop supply.', '/images/products/1781457361815.jpeg', 8, true),
    ('fashion', 'Li-Ning Feidian 3 Challenger Shoes', 'li-ning-feidian-3-challenger-shoes', 'Lightweight performance running shoes with breathable support for daily training.', '/images/products/1781368026884.jpeg', 9, false),
    ('fashion', 'Premium Sports Shoes', 'premium-sports-shoes', 'Comfort-focused sports shoes designed for active use, walking, and casual wear.', '/images/products/1781689912099.jpeg', 10, false),
    ('fashion', 'Selector Premium Shaving Set', 'selector-premium-shaving-set', 'Structured grooming and shaving kit for a clean, elevated personal care routine.', '/images/products/1783082330465.jpeg', 11, false),
    ('home-textiles', 'Traditional Lungi Collection', 'traditional-lungi-collection', 'Comfortable traditional lungi options for daily wear and retail textile sourcing.', '/images/products/1781530716533.jpeg', 12, false),
    ('home-textiles', 'CYNOVIA Textile Collection', 'cynovia-textile-collection', 'Colorful textile collection focused on comfort, practical use, and local retail demand.', '/images/products/1782744308829.jpeg', 13, false),
    ('home-textiles', 'CYNOVIA Textile Brand Pack', 'cynovia-textile-brand-pack', 'CYNOVIA textile identity pack for premium home and lifestyle fabric sourcing.', '/images/products/1782967143335.jpeg', 14, false),
    ('home-textiles', 'CYNOVIA Ginet House Textile', 'cynovia-ginet-house-textile', 'Soft, breathable textile collection for everyday home and lifestyle comfort.', '/images/products/1782996561119.jpeg', 15, false),
    ('gadgets-electronics', 'S Younger Lithium Ion Battery', 's-younger-lithium-ion-battery', 'Rechargeable lithium-ion battery solution for power backup and electronics use.', '/images/products/1781072560765.jpeg', 16, false),
    ('gadgets-electronics', 'S Younger 5V Lithium Battery', 's-younger-5v-lithium-battery', 'Portable 5V lithium battery package for reliable compact power supply needs.', '/images/products/1781173338447.jpeg', 17, false),
    ('gadgets-electronics', 'Smart Power Inverter Battery', 'smart-power-inverter-battery', 'Inverter and battery backup solution for smarter, stable power support.', '/images/products/1781772889561.jpeg', 18, false),
    ('gadgets-electronics', 'Handheld Portable Turbo Mini Fan', 'handheld-portable-turbo-mini-fan', 'Type-C USB rechargeable mini fan for travel, desk, and daily cooling.', '/images/products/1783009613418.jpeg', 19, false),
    ('medical-supplies-reagents', 'BioVision Medical Equipment', 'biovision-medical-equipment', 'Medical equipment and reagent sourcing support for professional healthcare buyers.', '/images/products/1782717193173.jpeg', 20, false),
    ('medical-supplies-reagents', 'Auto Optics FA-6500K Analyzer', 'auto-optics-fa-6500k-analyzer', 'Clinical optics analyzer for diagnostic labs and healthcare procurement requirements.', '/images/products/1783276109216.jpeg', 21, false),
    ('gift-corner', 'Import and Export Services', 'import-export-services', 'End-to-end import and export support for sourcing, logistics, and business procurement.', '/images/products/1781838841047.jpeg', 22, false),
    ('gift-corner', 'China Import Sourcing Service', 'china-import-sourcing-service', 'China sourcing support for product discovery, supplier coordination, and shipment planning.', '/images/products/1781925833028.jpeg', 23, false),
    ('gift-corner', 'Air Cargo Import Service', 'air-cargo-import-service', 'Fast air cargo and import support for urgent commercial product shipments.', '/images/products/1781193311322.jpeg', 24, false),
    ('home-appliances', 'Commercial File Delivery Machine', 'commercial-file-delivery-machine', 'Professional equipment package for automated preparation and business service workflows.', '/images/products/1781893911083.jpeg', 25, false),
    ('home-appliances', 'Small Business Equipment Package', 'small-business-equipment-package', 'Selected business equipment set for shops, service counters, and growing operations.', '/images/products/1781592153967.jpeg', 26, false)
) as products(category_slug, name, slug, description, image_url, sort_order, is_featured)
join public.categories on categories.slug = products.category_slug;

delete from public.home_slides;

insert into public.home_slides (
  title,
  subtitle,
  badge,
  image_url,
  primary_label,
  primary_href,
  secondary_label,
  secondary_href,
  sort_order,
  is_active
) values
('CYNOVIA Import and Export Services', 'Global product sourcing, import support, export coordination, and shipment guidance for growing businesses.', 'Global products. Local confidence.', '/images/slides/import-export-services.jpeg', 'Explore Services', '/categories', 'Contact Us', '/contact', 1, true),
('CYNOVIA Textile Collection', 'Comfortable textile, fashion, and lifestyle product sourcing for local retail and wholesale needs.', 'Where tradition meets comfort', '/images/slides/cynovia-textile.jpeg', 'View Textiles', '/categories/home-textiles', 'Contact Us', '/contact', 2, true),
('Medical Equipment and Reagents', 'Trusted medical equipment, lab reagent support, and healthcare sourcing from reliable suppliers.', 'Healthcare sourcing support', '/images/slides/medical-equipment.jpeg', 'View Medical Products', '/categories/medical-supplies-reagents', 'Contact Us', '/contact', 3, true);
