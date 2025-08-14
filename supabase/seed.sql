-- SEED DATA

-- Insert categories
insert into categories (id, name) values
  ('00000000-0000-0000-0000-000000000001', 'Electronics'),
  ('00000000-0000-0000-0000-000000000002', 'Books'),
  ('00000000-0000-0000-0000-000000000003', 'Clothing');

-- Insert products
insert into products (id, name, description, image_url, price, stock, category_id) values
  ('20000000-0000-0000-0000-000000000001', 'Wireless Headphones', 'Bluetooth over-ear headphones', 'https://via.placeholder.com/150', 99.99, 25, '00000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002', 'Science Fiction Novel', 'A thrilling sci-fi adventure', 'https://via.placeholder.com/150', 15.50, 100, '00000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000003', 'T-shirt', '100% cotton, unisex', 'https://via.placeholder.com/150', 19.99, 50, '00000000-0000-0000-0000-000000000003');

-- Insert orders
insert into orders (id, user_id, total, status, shipping_address) values
  ('30000000-0000-0000-0000-000000000001', 'cb1b0137-d030-4932-a010-a3d4e0a3423e', 115.49, 'pending', '123 Main St, Cityville'),
  ('30000000-0000-0000-0000-000000000002', 'cb1b0137-d030-4932-a010-a3d4e0a3423e', 19.99, 'shipped', '456 Elm St, Townsville');

-- Insert order items
insert into order_items (id, order_id, product_id, quantity, price) values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 1, 99.99),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 1, 15.50),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', 1, 19.99);
