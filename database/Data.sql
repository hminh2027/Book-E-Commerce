-- INSERT COUNTRIES --
insert into COUNTRIES values ('VietNam')
insert into COUNTRIES values ('USA')
insert into COUNTRIES values ('Russian')
insert into COUNTRIES values ('Franch')
insert into COUNTRIES values ('Japan')
insert into COUNTRIES values ('Thailan')
insert into COUNTRIES values ('Singapore')

-- INSERT ROLES --
insert into ROLES values ('admin')
insert into ROLES values ('customer')

-- INSERT USERS --
insert into USERS values (1, 1, N'Vũ Hoàng', N'Minh', null, 'admin', '202cb962ac59075b964b07152d234b70', '0965766511', 'vhminh2027@gmail.com', getdate(), getdate(), 1)
insert into USERS values (2, 2, N'Vũ Đinh Trọng', N'Thắng', null, 'thang1', '202cb962ac59075b964b07152d234b70', '0832412321', 'thangngot@gmail.com', getdate(), getdate(), 1)
insert into USERS values (4, 2, N'Matthew ', N'Healy', null, 'the1975', '202cb962ac59075b964b07152d234b70', '0123455675', 'the1975@gmail.com', getdate(), getdate(), 1)


-- INSERT SHIPPINGS --
insert into SHIPPINGS values ('Rabbit Deliver', 10000, getdate(), getdate(), 0)
insert into SHIPPINGS values ('Turtle Deliver', 5000, getdate(), getdate(), 0)
insert into SHIPPINGS values ('Super Fast Deliver', 20000, getdate(), getdate(), 0)

-- TAGS --
insert into TAGS values ('Asian', getdate(), getdate(), 0)
insert into TAGS values ('Teen', getdate(), getdate(), 0)
insert into TAGS values ('Travel', getdate(), getdate(), 0)
insert into TAGS values ('Fashion', getdate(), getdate(), 0)
insert into TAGS values ('Famous', getdate(), getdate(), 0)
insert into TAGS values ('Horror', getdate(), getdate(), 0)
insert into TAGS values ('Chrismas', getdate(), getdate(), 0)
insert into TAGS values ('Recommendation', getdate(), getdate(), 0)
insert into TAGS values ('Books', getdate(), getdate(), 0)
insert into TAGS values ('Future', getdate(), getdate(), 0)

-- CATEGORIES --
insert into CATEGORIES values ('Classics', getdate(), getdate(), 0)
insert into CATEGORIES values ('Novel', getdate(), getdate(), 0)
insert into CATEGORIES values ('Cosmic', getdate(), getdate(), 0)
insert into CATEGORIES values ('Fantasy', getdate(), getdate(), 0)
insert into CATEGORIES values ('Horror', getdate(), getdate(), 0)
insert into CATEGORIES values ('Fiction', getdate(), getdate(), 0)
insert into CATEGORIES values ('Poetry', getdate(), getdate(), 0)
insert into CATEGORIES values ('Romance', getdate(), getdate(), 0)

-- COUPONS --
insert into COUPONS values ('SALE10', 10000, getdate(), getdate(), 0)
insert into COUPONS values ('SALE50', 50000, getdate(), getdate(), 0)
insert into COUPONS values ('SALE100', 100000, getdate(), getdate(), 0)

-- ORDER STATUS --
insert into ORDER_STATUS values ('Delivered')
insert into ORDER_STATUS values ('Canceled')
insert into ORDER_STATUS values ('Refunded')
insert into ORDER_STATUS values ('Waiting for payment')
insert into ORDER_STATUS values ('Delivering')
insert into ORDER_STATUS values ('Completed')

-- BLOGS --
insert into BLOGS values (1, 'What is happening around the world?', 'This is a fake blog, so im gonna using lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', null, getdate(), getdate(), 0)
insert into BLOGS values (1, 'Music is what you need!', 'The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today its seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum', null, getdate(), getdate(), 0)
insert into BLOGS values (1, 'Top 10 books of all time', 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesnt distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.', null, getdate(), getdate(), 0)
insert into BLOGS values (1, '1 chapter a day keep the pressure away!', 'Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero.', null, getdate(), getdate(), 0)
insert into BLOGS values (1, 'I dont know what title this should be', 'Its difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasnt relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries', null, getdate(), getdate(), 0)


-- BOOKS --
insert into BOOKS values (1, 'In Search of Lost Time', 10000, 45000, 10, 99, 'BK1', 'Swanns Way, the first part of A la recherche de temps perdu, Marcel Prousts seven-part cycle, was published in 1913', 'In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swanns passion for Odette. The work is incomparable. Edmund Wilson said Proust has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (2, 'Ulysses', 15000, 36000, 0, 0, 'BK2',  'Catch-22 is a satirical, historical novel by the American author Joseph Heller, first published in 1961. The novel, set during the later stages of World War II from 1943 onwards, is frequently cite', 'Catch-22 is a satirical, historical novel by the American author Joseph Heller, first published in 1961. The novel, set during the later stages of World War II from 1943 onwards, is frequently cite', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (1, 'Don Quixote', 22000, 41000, 5, 12, 'BK3',  'The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa. Although Conrad does not specify the name', 'The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa. Although Conrad does not specify the name', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (3, 'One Hundred Years of Solitude', 10000, 25000, 12, 8, 'BK4', 'The Sound and the Fury is set in the fictional Yoknapatawpha County. The novel centers on the Compson family, former Southern aristocrats who are struggling to deal with the dissolution of their', 'The Sound and the Fury is set in the fictional Yoknapatawpha County. The novel centers on the Compson family, former Southern aristocrats who are struggling to deal with the dissolution of their', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (3, 'The Great Gatsby', 16000, 33000, 3, 3, 'BK5', 'Great Expectations is written in the genre of "bildungsroman" or the style of book that follows the story of a man or woman in their quest for maturity, usually starting from childhood and ending', 'Great Expectations is written in the genre of "bildungsroman" or the style of book that follows the story of a man or woman in their quest for maturity, usually starting from childhood and ending', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (4, 'War and Peace', 11000, 37000, 40, 53, 'BK6', 'Set during the Great Depression, the novel focuses on a poor family of sharecroppers, the Joads, driven from their home by drought, economic hardship, and changes in the agriculture industry', 'Set during the Great Depression, the novel focuses on a poor family of sharecroppers, the Joads, driven from their home by drought, economic hardship, and changes in the agriculture industry', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (5, 'Hamlet', 14000, 60000, 10, 43, 'BK7', 'One Thousand and One Nights is a collection of Middle Eastern and South Asian stories and folk tales compiled in Arabic during the Islamic Golden Age. It is often known in English as the Arabian', 'One Thousand and One Nights is a collection of Middle Eastern and South Asian stories and folk tales compiled in Arabic during the Islamic Golden Age. It is often known in English as the Arabian', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (6, 'Lolita', 13000, 46000, 20, 5, 'BK8', 'A landmark novel of high modernism, the text, centering on the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920, skillfully manipulates temporality and psycholog', 'A landmark novel of high modernism, the text, centering on the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920, skillfully manipulates temporality and psycholog', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (4, 'Kafka on the Shore', 13000, 55000, 12, 24, 'BK9', 'In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole', 'In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (1, 'The Adventures of Huckleberry Finn', 20000, 45000, 60, 31, 'BK10', 'Revered by all of the towns children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literatur', 'Revered by all of the towns children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literatur', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (1, 'The Spartacus', 12000, 45000, 10, 0, 'BK11', 'Swanns Way, the first part of A la recherche de temps perdu, Marcel Prousts seven-part cycle, was published in 1913', 'In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swanns passion for Odette. The work is incomparable. Edmund Wilson said Proust has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (2, 'Salmon!', 15000, 36000, 0, 0, 'BK12',  'Catch-22 is a satirical, historical novel by the American author Joseph Heller, first published in 1961. The novel, set during the later stages of World War II from 1943 onwards, is frequently cite', 'Catch-22 is a satirical, historical novel by the American author Joseph Heller, first published in 1961. The novel, set during the later stages of World War II from 1943 onwards, is frequently cite', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (1, 'The Pragmatic Programmer', 22000, 41000, 5, 0, 'BK13',  'The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa. Although Conrad does not specify the name', 'The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa. Although Conrad does not specify the name', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (3, 'Clean Code', 10000, 25000, 0, 8, 'BK14', 'The Sound and the Fury is set in the fictional Yoknapatawpha County. The novel centers on the Compson family, former Southern aristocrats who are struggling to deal with the dissolution of their', 'The Sound and the Fury is set in the fictional Yoknapatawpha County. The novel centers on the Compson family, former Southern aristocrats who are struggling to deal with the dissolution of their', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (3, 'Dynamic Duo', 16000, 33000, 3, 3, 'BK15', 'Great Expectations is written in the genre of "bildungsroman" or the style of book that follows the story of a man or woman in their quest for maturity, usually starting from childhood and ending', 'Great Expectations is written in the genre of "bildungsroman" or the style of book that follows the story of a man or woman in their quest for maturity, usually starting from childhood and ending', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (6, 'Let me follow', 11000, 37000, 0, 53, 'BK16', 'Set during the Great Depression, the novel focuses on a poor family of sharecroppers, the Joads, driven from their home by drought, economic hardship, and changes in the agriculture industry', 'Set during the Great Depression, the novel focuses on a poor family of sharecroppers, the Joads, driven from their home by drought, economic hardship, and changes in the agriculture industry', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (5, 'There Is No One At All', 14000, 60000, 0, 43, 'BK17', 'One Thousand and One Nights is a collection of Middle Eastern and South Asian stories and folk tales compiled in Arabic during the Islamic Golden Age. It is often known in English as the Arabian', 'One Thousand and One Nights is a collection of Middle Eastern and South Asian stories and folk tales compiled in Arabic during the Islamic Golden Age. It is often known in English as the Arabian', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (6, 'The Lord of The Ring', 13000, 46000, 20, 5, 'BK18', 'A landmark novel of high modernism, the text, centering on the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920, skillfully manipulates temporality and psycholog', 'A landmark novel of high modernism, the text, centering on the Ramsay family and their visits to the Isle of Skye in Scotland between 1910 and 1920, skillfully manipulates temporality and psycholog', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (8, 'The Art Of Not Giving A F', 13000, 55000, 0, 24, 'BK19', 'In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole', 'In 1862 Charles Lutwidge Dodgson, a shy Oxford mathematician with a stammer, created a story about a little girl tumbling down a rabbit hole', getdate(), getdate(), getdate(), 0)
insert into BOOKS values (7, 'Say Goodbye', 20000, 45000, 60, 31, 'BK20', 'Revered by all of the towns children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literatur', 'Revered by all of the towns children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literatur', getdate(), getdate(), getdate(), 0)

-- BOOK IMAGES --
insert into BOOK_IMAGES values (1, 'https://res.cloudinary.com/minh2027/image/upload/v1651823507/Book%20E-Commerce/1_avulh7.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (2, 'https://res.cloudinary.com/minh2027/image/upload/v1651823507/Book%20E-Commerce/2_ydxw2r.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (3, 'https://res.cloudinary.com/minh2027/image/upload/v1651823504/Book%20E-Commerce/4_smsxj9.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (4, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/28_itaan9.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (5, 'https://res.cloudinary.com/minh2027/image/upload/v1651823506/Book%20E-Commerce/29_olh3uo.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (6, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/27_jkkx74.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (7, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/26_uyu3fv.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (8, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/22_aq0rqu.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (9, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/24_bxc4er.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (10, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/23_xg1yqc.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (11, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/20_zh4u7t.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (12, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/17_urnijs.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (13, 'https://res.cloudinary.com/minh2027/image/upload/v1651823505/Book%20E-Commerce/18_djf6ks.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (14, 'https://res.cloudinary.com/minh2027/image/upload/v1651823504/Book%20E-Commerce/16_sx4tgj.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (15, 'https://res.cloudinary.com/minh2027/image/upload/v1651823504/Book%20E-Commerce/15_pxenj2.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (16, 'https://res.cloudinary.com/minh2027/image/upload/v1651823503/Book%20E-Commerce/8_z38r5i.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (17, 'https://res.cloudinary.com/minh2027/image/upload/v1651823506/Book%20E-Commerce/quickview-l2_hnpoei.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (18, 'https://res.cloudinary.com/minh2027/image/upload/v1651823506/Book%20E-Commerce/quickview-s4_cnmjti.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (19, 'https://res.cloudinary.com/minh2027/image/upload/v1651823506/Book%20E-Commerce/quickview-s3_djr5oh.jpg', getdate(), getdate(), 0)
insert into BOOK_IMAGES values (20, 'https://res.cloudinary.com/minh2027/image/upload/v1651823506/Book%20E-Commerce/quickview-l5_yf4tdj.jpg', getdate(), getdate(), 0)


-- COMMENTS --
insert into COMMENTS values (2, 2, 'What an advice!', getdate(), getdate(), 0)
insert into COMMENTS values (2, 3, 'Can i have your number?', getdate(), getdate(), 0)
insert into COMMENTS values (3, 1, 'Seriously...', getdate(), getdate(), 1)
insert into COMMENTS values (3, 2, 'Would love to read more!', getdate(), getdate(), 0)

-- REVIEWS --
insert into REVIEWS values (2, 1, 3, 'OMG!', getdate(), getdate(), 0)
insert into REVIEWS values (2, 1, 4, 'Great book!', getdate(), getdate(), 0)
insert into REVIEWS values (3, 3, 5, 'Definitely should read!', getdate(), getdate(), 0)
insert into REVIEWS values (2, 5, 1, 'Boring', getdate(), getdate(), 0)


-- BLOG TAGS --
insert into BLOG_TAGS values (1, 1, getdate(), getdate(), 0)
insert into BLOG_TAGS values (2, 1, getdate(), getdate(), 0)
insert into BLOG_TAGS values (3, 1, getdate(), getdate(), 0)
insert into BLOG_TAGS values (4, 2, getdate(), getdate(), 0)
insert into BLOG_TAGS values (5, 2, getdate(), getdate(), 0)
insert into BLOG_TAGS values (4, 3, getdate(), getdate(), 0)
insert into BLOG_TAGS values (1, 3, getdate(), getdate(), 0)
insert into BLOG_TAGS values (3, 4, getdate(), getdate(), 0)
insert into BLOG_TAGS values (5, 5, getdate(), getdate(), 0)
insert into BLOG_TAGS values (3, 5, getdate(), getdate(), 0)

-- ORDERS --
insert into ORDERS values (1, 2, 1,  2, 'Please becareful, fragile product!', getdate(), getdate(), getdate(), 0)
insert into ORDERS values (2, null, 2, 2, null, getdate(), getdate(), getdate(), 0)
insert into ORDERS values (2, null, 2, 3, null, getdate(), getdate(), getdate(), 0)

-- ORDER DETAILS --
insert into ORDER_DETAILS values (2, 1, 1, 45000)
insert into ORDER_DETAILS values (3, 1, 2, 72000)
insert into ORDER_DETAILS values (4, 2, 1, 13000)

-- CARTS --
insert into CARTS values (2, getdate(), getdate(), 0)
insert into CARTS values (3, getdate(), getdate(), 0)

-- CART DETAILS --
insert into CART_DETAILS values (1, 2, 1)
insert into CART_DETAILS values (1, 3, 2)

-- USER ADDRESS --
insert into USER_ADDRESS values (2, N'123 Xuân La Nam Từ Liêm', N'Hà Nội', N'United', 'VNA12',getdate(), getdate(), 0)
insert into USER_ADDRESS values (3, N'123 Cầu Giấy Mỹ Đình', N'Hải Dương', N'Manchester', 'VNA256',getdate(), getdate(), 0)