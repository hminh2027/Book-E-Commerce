CREATE TABLE [USERS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [country_id] int NOT NULL,
  [role_id] int NOT NULL,
  [first_name] nvarchar(255),
  [last_name] nvarchar(255),
  [company_name] nvarchar(255),
  [username] nvarchar(255) UNIQUE,
  [password] nvarchar(255),
  [phone] nvarchar(255),
  [email] nvarchar(255) UNIQUE,
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_active] bit DEFAULT (1)
)
GO

CREATE TABLE [USER_ADDRESS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [address] nvarchar(255),
  [city] nvarchar(255),
  [state] nvarchar(255),
  [postcode] nvarchar(255),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [ROLES] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255)
)
GO

CREATE TABLE [COUNTRIES] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255)
)
GO

CREATE TABLE [BLOGS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [title] nvarchar(255),
  [body] varchar(max),
  [thumbnail] nvarchar(255),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [COMMENTS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [blog_id] int NOT NULL,
  [body] nvarchar(255),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [BOOKS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [category_id] int NOT NULL,
  [title] nvarchar(255),
  [price_in] money,
  [price_out] money,
  [sale] int,
  [quantity] int,
  [sku_code] nvarchar(255),
  [short_description] varchar(max),
  [long_description] varchar(max),
  [published_at] datetime DEFAULT (getdate()),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [BOOK_IMAGES] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [book_id] int NOT NULL,
  [image] nvarchar(255),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [REVIEWS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [book_id] int NOT NULL,
  [rate] int DEFAULT (5),
  [body] nvarchar(255),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [TAGS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [tag_name] nvarchar(255),
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [BLOG_TAGS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [tag_id] int NOT NULL,
  [blog_id] int NOT NULL,
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [CATEGORIES] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255) UNIQUE,
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [ORDER_STATUS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [status] nvarchar(255)
)
GO

CREATE TABLE [ORDERS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [shipping_id] int NOT NULL,
  [coupon_id] int,
  [status_id] int,
  [user_id] int NOT NULL,
  [note] varchar(max),
  [paid_at] datetime,
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [ORDER_DETAILS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [book_id] int NOT NULL,
  [order_id] int NOT NULL,
  [quantity] int DEFAULT (1),
  [price] money
)
GO

CREATE TABLE [SHIPPINGS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [shipping_method] nvarchar(255),
  [price] money,
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [COUPONS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [code] nvarchar(255),
  [value] int,
  [created_at] datetime DEFAULT (getdate()),
  [modified_at] datetime DEFAULT (getdate()),
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [CARTS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_id] int NOT NULL,
  [created_at] datetime,
  [modified_at] datetime,
  [is_deleted] bit DEFAULT (0)
)
GO

CREATE TABLE [CART_DETAILS] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [cart_id] int NOT NULL,
  [book_id] int NOT NULL,
  [quantity] int DEFAULT (1)
)
GO

ALTER TABLE [USERS] ADD FOREIGN KEY ([country_id]) REFERENCES [COUNTRIES] ([id])
GO

ALTER TABLE [USERS] ADD FOREIGN KEY ([role_id]) REFERENCES [ROLES] ([id])
GO

ALTER TABLE [USER_ADDRESS] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([id])
GO

ALTER TABLE [BLOGS] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([id])
GO

ALTER TABLE [COMMENTS] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([id])
GO

ALTER TABLE [COMMENTS] ADD FOREIGN KEY ([blog_id]) REFERENCES [BLOGS] ([id])
GO

ALTER TABLE [BOOKS] ADD FOREIGN KEY ([category_id]) REFERENCES [CATEGORIES] ([id])
GO

ALTER TABLE [BOOK_IMAGES] ADD FOREIGN KEY ([book_id]) REFERENCES [BOOKS] ([id])
GO

ALTER TABLE [REVIEWS] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([id])
GO

ALTER TABLE [REVIEWS] ADD FOREIGN KEY ([book_id]) REFERENCES [BOOKS] ([id])
GO

ALTER TABLE [BLOG_TAGS] ADD FOREIGN KEY ([tag_id]) REFERENCES [TAGS] ([id])
GO

ALTER TABLE [BLOG_TAGS] ADD FOREIGN KEY ([blog_id]) REFERENCES [BLOGS] ([id])
GO

ALTER TABLE [ORDERS] ADD FOREIGN KEY ([shipping_id]) REFERENCES [SHIPPINGS] ([id])
GO

ALTER TABLE [ORDERS] ADD FOREIGN KEY ([country_id]) REFERENCES [COUNTRIES] ([id])
GO

ALTER TABLE [ORDERS] ADD FOREIGN KEY ([coupon_id]) REFERENCES [COUPONS] ([id])
GO

ALTER TABLE [ORDERS] ADD FOREIGN KEY ([status_id]) REFERENCES [ORDER_STATUS] ([id])
GO

ALTER TABLE [ORDERS] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([id])
GO

ALTER TABLE [ORDER_DETAILS] ADD FOREIGN KEY ([book_id]) REFERENCES [BOOKS] ([id])
GO

ALTER TABLE [ORDER_DETAILS] ADD FOREIGN KEY ([order_id]) REFERENCES [ORDERS] ([id])
GO

ALTER TABLE [CARTS] ADD FOREIGN KEY ([user_id]) REFERENCES [USERS] ([id])
GO

ALTER TABLE [CART_DETAILS] ADD FOREIGN KEY ([cart_id]) REFERENCES [CARTS] ([id])
GO

ALTER TABLE [CART_DETAILS] ADD FOREIGN KEY ([book_id]) REFERENCES [BOOKS] ([id])
GO
