-------------------------------------------------------------------------------- VIEWS --------------------------------------------------------------------------------
go
create or alter view V_BOOKS as
select a.id, b.id as category_id, name as category, image, isnull(avg(rate), 0) as rate, count(c.id) as reviews, title, price_out as old_price, (price_out - (price_out * sale /100) ) as price, sale, quantity, sku_code, short_description, long_description,
case
    when ( getdate() - published_at ) < 7 then 1
    else 0
end as is_new
from BOOKS a 
join CATEGORIES b on b.id = a.category_id
left join REVIEWS c on c.book_id = a.id
join BOOK_IMAGES d on d.book_id = a.id
where a.is_deleted = 0
group by a.id, b.id, b.name, title, price_out, sale, quantity, sku_code, short_description , long_description, published_at, image
go
select * from V_BOOKS where title like '%me%'
---
go
create or alter view V_CATEGORIES as
select a.id, name, count(b.id) as quantity from CATEGORIES a
join BOOKS b on a.id = b.category_id
where a.is_deleted = 0 and b.is_deleted = 0
group by a.id, a.name
go
select * from V_CATEGORIES
---
go
create or alter view V_TAGS as
select * from TAGS
where is_deleted = 0
go
select * from V_TAGS
---
go
create or alter view V_TAG_BLOGS as
select tag_id, a.blog_id, b.id, c.username, title, b.body, thumbnail, count(b.id) as comments, day(a.created_at) as day, datename(m, a.created_at) as month, convert(varchar, a.created_at, 100) as date 
from BLOG_TAGS a
join BLOGS b on b.id = a.blog_id
join USERS c on c.id = b.user_id
join COMMENTS d on d.blog_id = b.id
group by tag_id, b.id, c.username, title, b.body, thumbnail, a.created_at, a.blog_id
go
select * from V_TAG_BLOGS
---
go
create or alter view V_BLOG_TAGS as
select tag_id, b.tag_name, blog_id from BLOG_TAGS a
join TAGS b on b.id = a.tag_id
go
select * from V_BLOG_TAGS
---
go
create or alter view V_COMMENTS as
select blog_id, username, body, convert(varchar, a.modified_at, 100) as date from COMMENTS a
left join USERS b on b.id = a.user_id
where a.is_deleted = 0
go
select * from V_COMMENTS
---
go
create or alter view V_BLOGS as
select a.id, b.username, title, a.body, thumbnail, count(c.blog_id) as comments, day(a.created_at) as day, datename(m, a.created_at) as month, convert(varchar, a.created_at, 100) as date 
from BLOGS a
left join USERS b on b.id = a.user_id
left join COMMENTS c on c.blog_id = a.id
where a.is_deleted = 0
group by a.id, b.username, title, a.body, thumbnail, a.created_at
go
select * from V_BLOGS
---
go
create or alter view V_FEATURED_BOOKS as
select top (5) a.id, isnull(avg(rate), 0) as rate, image, title, price_out as old_price, (price_out - (price_out * sale /100) ) as price, sale,
case
    when ( getdate() - published_at ) < 7 then 1
    else 0
end as is_new
from BOOKS a 
left join REVIEWS b on b.book_id = a.id
join BOOK_IMAGES d on d.book_id = a.id
where a.is_deleted = 0
group by a.id, title, price_out, sale, published_at, image
order by isnull(avg(rate), 0) desc
go
select * from V_FEATURED_BOOKS
---
go
create or alter view V_ONSALE_BOOKS as
select  a.id, isnull(avg(rate), 0) as rate, image, title, price_out as old_price, (price_out - (price_out * sale /100) ) as price, sale, short_description,
case
    when ( getdate() - published_at ) < 7 then 1
    else 0
end as is_new
from BOOKS a 
left join REVIEWS b on b.book_id = a.id
join BOOK_IMAGES d on d.book_id = a.id
where a.is_deleted = 0
group by a.id, title, price_out, sale, short_description, quantity, sale, published_at, image
having sale > 0 and quantity > 0
order by sale desc offset 0 rows
go
select * from V_ONSALE_BOOKS
---
go
create or alter view V_BESTSELLER_BOOKS as
select top (4) sum(c.quantity) as quantity, image, a.id, isnull(avg(rate), 0) as rate, title, price_out as old_price, (price_out - (price_out * sale /100) ) as price, sale,
case
    when ( getdate() - published_at ) < 7 then 1
    else 0
end as is_new
from BOOKS a 
left join REVIEWS b on b.book_id = a.id
join ORDER_DETAILS c on c.book_id = a.id
join BOOK_IMAGES d on d.book_id = a.id
where a.is_deleted = 0
group by title, a.id, price_out, sale, published_at, image
order by sum(c.quantity) desc 
go
select * from V_BESTSELLER_BOOKS
---
go
create or alter view V_NEW_BOOKS as
select a.id, isnull(avg(rate), 0) as rate, title, image, price_out as old_price, (price_out - (price_out * sale /100) ) as price, sale, 
case
    when ( getdate() - published_at ) < 7 then 1
    else 0
end as is_new
from BOOKS a 
left join REVIEWS b on b.book_id = a.id
join BOOK_IMAGES d on d.book_id = a.id
where a.is_deleted = 0 and ( getdate() - published_at ) < 7
group by title, a.id, price_out, sale, published_at, image
go
select * from V_NEW_BOOKS
---
go
create or alter view V_NEW_BOOKS as
select a.id, isnull(avg(rate), 0) as rate, image, title, price_out as old_price, (price_out - (price_out * sale /100) ) as price, sale,
case
    when ( getdate() - published_at ) < 7 then 1
    else 0
end as is_new
from BOOKS a 
left join REVIEWS b on b.book_id = a.id
join BOOK_IMAGES d on d.book_id = a.id
where a.is_deleted = 0 and b.is_deleted = 0
group by a.id, title, price_out, sale, published_at, image
go
select * from V_NEW_BOOKS
---
go
create or alter view V_SHIPPINGS as
select id, shipping_method as name, price from SHIPPINGS
go
select * from V_SHIPPINGS
---
go
create or alter view V_COUNTRIES as
select id, name from COUNTRIES
go
select * from V_COUNTRIES
---
go
create or alter view V_ADDRESSES as
select user_id, address, city, state, postcode from USER_ADDRESS
where is_deleted = 0
go
select * from V_ADDRESSES
---
go
create or alter view V_USERS as
select a.id, b.name as country, c.name as role, first_name, last_name, company_name, username, phone, email, convert(varchar, created_at, 100) as join_date, is_active 
from USERS a
join COUNTRIES b on b.id = a.country_id
join ROLES c on c.id = a.role_id
go
select * from V_USERS
---
go
create or alter view V_COUPONS as
select id, code, value from COUPONS
where is_deleted = 0
go
select * from V_COUPONS
---
go
create or alter view V_ORDERS as
select a.id, a.user_id as userID, last_name as name, convert(varchar, a.created_at, 100) as date, b.status, sum(c.price) as subtotal, (sum(c.price) + d.price) as total, d.price as shipping_price, shipping_method, note
from ORDERS a
join ORDER_STATUS b on b.id = a.status_id
left join ORDER_DETAILS c on c.order_id = a.id
join SHIPPINGS d on d.id = a.shipping_id
join USERS e on e.id = a.user_id
group by a.id, a.created_at, b.status, a.user_id, d.price, shipping_method, last_name, note
order by sum(c.price) desc offset 0 rows
go
select * from V_ORDERS
---
go
create or alter view V_ORDER_DETAILS as
select b.id, b.title, a.quantity, b.price_out as cost, a.price, order_id from ORDER_DETAILS a
join BOOKS b on a.book_id = b.id
join ORDERS c on c.id = a.order_id
go
select * from V_ORDER_DETAILS where order_id = 1
---
go
create or alter view V_TOP_CUSTOMER as
select top 1 username, sum(c.price) as amount 
from USERS a
left join ORDERS b on b.user_id = a.id
left join ORDER_DETAILS c on c.order_id = b.id
group by username
order by sum(c.price) desc
go
select * from V_TOP_CUSTOMER
---
go
create or alter view V_TOTAL_PROFIT as
select sum(total) as total 
from V_ORDERS
go
select * from V_TOTAL_PROFIT
---
go
create or alter view V_TODAY_ORDERS as
select count(*) as count
from V_ORDERS a
where DATEDIFF(day, getdate(), a.date) = 0
group by a.date
go
select * from V_TODAY_ORDERS
---
go
create or alter view V_MONTHLY_REVENUE as
select month(a.date) as month, sum(a.total) as total
from V_ORDERS a
group by month(a.date)
order by month(a.date) offset 0 rows
go
select * from V_MONTHLY_REVENUE
-------------------------------------------------------------------------------- STORED PROCEDURE --------------------------------------------------------------------------------
go
create or alter proc SP_GETCARTBYID @id int as
begin
	select a.id, a.title, sum(b.quantity) as quantity, a.quantity as quantity_left, image, a.price_out as price, sum(a.price_out * b.quantity) as subtotal 
	from BOOKS a
	inner join CART_DETAILS b on a.id = b.book_id
	inner join CARTS c on c.id = b.cart_id
	join BOOK_IMAGES d on d.book_id = a.id
	where c.user_id = @id
	group by a.id, a.title, a.quantity, image, a.price_out
end
go
exec SP_GETCARTBYID @id = 2
---
go
create or alter proc SP_USERLOGIN @username nvarchar(255), @password nvarchar(255) as
begin
	 select a.id, b.id as country_id, d.id as cart_id, c.name as role, first_name, last_name, company_name, username, phone, email, state, city, address, postcode
	 from USERS a
	 join COUNTRIES b on b.id = a.country_id
	 join ROLES c on c.id = a.role_id
	 join CARTS d on d.user_id = a.id
	 join USER_ADDRESS e on e.user_id = a.id
	 where username = @username and password = @password and role_id = 2 and is_active = 1 
end
go
exec SP_USERLOGIN @username = 'thang1', @password = '202cb962ac59075b964b07152d234b70'
---
go
create or alter proc SP_ADMIN_LOGIN @username nvarchar(255), @password nvarchar(255) as
begin
	begin tran
		begin try
			select a.id, b.id as country_id, d.id as cart_id, c.name as role, first_name, last_name, company_name, username, phone, email state, city, address, postcode
			from USERS a
			join COUNTRIES b on b.id = a.country_id
			join ROLES c on c.id = a.role_id
			left join CARTS d on d.user_id = a.id
			left join USER_ADDRESS e on e.user_id = a.id
			 where username = @username and password = @password and role_id = 1 and is_active = 1 
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
go
exec SP_ADMIN_LOGIN @username = 'admin', @password = '202cb962ac59075b964b07152d234b70'
---
go
create or alter proc SP_SIGNUP 
@first_name nvarchar(255), 
@last_name nvarchar(255), 
@company_name nvarchar(255), 
@email nvarchar(255), 
@phone nvarchar(255), 
@country int, 
@address nvarchar(255),
@city nvarchar(255), 
@state nvarchar(255), 
@postcode nvarchar(255), 
@username nvarchar(255), 
@password nvarchar(255) as
begin
	begin tran
		begin try
			insert into USERS values (@country, 2, @first_name, @last_name, @company_name, @username, @password, @phone, @email, getdate(), getdate(), 1)
			insert into USER_ADDRESS values(IDENT_CURRENT('USERS'), @address, @city, @state, @postcode, getdate(), getdate(), 0)
			exec SP_ADMINLOGIN @username = @username, @password = @password
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_UPDATE_USER 
@first_name nvarchar(255), 
@last_name nvarchar(255), 
@company_name nvarchar(255), 
@email nvarchar(255), 
@phone nvarchar(255), 
@country int, 
@username nvarchar(255), 
@password nvarchar(255) as
begin
	begin tran
		begin try
			update USERS set first_name = @first_name, last_name = @last_name, company_name = @company_name, email = @email, phone = @phone, country_id = @country, password = @password
			where username = @username
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_UPDATE_USER_ADDRESS
@user_id int, 
@address nvarchar(255), 
@city nvarchar(255), 
@state nvarchar(255), 
@postcode nvarchar(255) as
begin
	begin tran
		begin try
			update USER_ADDRESS set address = @address, city = @city, state = @state, postcode = @postcode
			where user_id = @user_id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_INSERT_CART_DETAIL @cart_id int, @book_id int, @quantity int as
begin
	begin tran
		begin try
			insert into CART_DETAILS values (@cart_id, @book_id, @quantity)
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_UPDATE_CART_DETAIL @cart_id int, @book_id int, @quantity int as
begin
	begin tran
		begin try
			update CART_DETAILS set quantity = @quantity where cart_id = @cart_id and book_id = @book_id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_DELETE_CART_DETAIL @cart_id int, @book_id int as
begin
	begin tran
		begin try
			delete from CART_DETAILS where cart_id = @cart_id and book_id = @book_id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_DELETE_CART @cart_id int as
begin
	begin tran
		begin try
			delete from CART_DETAILS where cart_id = @cart_id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_INSERT_ORDER @shipping_id int, @coupon_id int, @user_id int, @note nvarchar(max) as
begin
	begin tran
		begin try
			insert into ORDERS values (@shipping_id , @coupon_id, 4, @user_id , @note, null, getdate(), getdate(), 0)
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_INSERT_ORDER_DETAIL @book_id int, @quantity int, @price money as
begin
	begin tran
		begin try
			insert into ORDER_DETAILS values (@book_id , IDENT_CURRENT('ORDERS') , @quantity, @price)
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_INSERT_BOOK 
@category_id int, 
@title nvarchar(255),
@image nvarchar(255), 
@price_in money, 
@price_out money,
@sale int,
@quantity int, 
@skucode nvarchar(255), 
@short_desc nvarchar(max), 
@long_desc nvarchar(max) as
begin
	begin tran
		begin try
			insert into BOOKS values (@category_id, @title, @price_in, @price_out, @sale, @quantity, @skucode, @short_desc, @long_desc, getdate(), getdate(), getdate(), 0)
			insert into BOOK_IMAGES values (IDENT_CURRENT('BOOKS'), @image, getdate(), getdate(), 0)
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_UPDATE_BOOK
@id int,
@category_id int, 
@title nvarchar(255),
@price_in money, 
@price_out money,
@sale int,
@quantity int, 
@skucode nvarchar(255), 
@short_desc nvarchar(max), 
@long_desc nvarchar(max) as
begin
	begin tran
		begin try
			update BOOKS set category_id = @category_id, title = @title, price_in = @price_in, price_out = @price_out, sale = @sale, quantity = @quantity, sku_code = @skucode, short_description = @short_desc, long_description = @long_desc, modified_at = getdate()
			where id = @id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_DELETE_BOOK 
@id int as
begin
	begin tran
		begin try
			update BOOKS set is_deleted = 1 where id = @id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
---
go
create or alter proc SP_DELETE_USER
@id int as
begin
	begin tran
		begin try
			update USERS set is_active = 0 where id = @id
			commit transaction
		end try
		begin catch
			rollback transaction
		end catch
end
-------------------------------------------------------------------------------- TRIGGERS --------------------------------------------------------------------------------
go
create or alter trigger TRG_DECREASE_BOOK on ORDER_DETAILS after insert as
begin
	declare @quantity int, @book_id int
	set @quantity  = (select quantity from inserted)
	set @book_id = (select book_id from inserted)
	update BOOKS set quantity = (select quantity from BOOKS where id = @book_id) - @quantity where id = @book_id
end