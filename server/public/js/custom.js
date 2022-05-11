const addToCart = (id) => {
    const formData = {
        bookId: id,
        quantity: $('.qty').val() || 1
    }

    $.ajax({
        type: "POST",
        url: "/cart/cartDetail",
        async: false,
        data: formData,
        success: (res) => {
            getCartDetails()
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const getCartDetails = () => {
    let total = 0
    $.ajax({
        url: 'http://localhost:8000/cart/data', 
        async: true, 
        success: (res) => {
            $('.single-cart').each((index, e) => {
                $(e).remove()
            })
            res.map(book => {
                total += book.subtotal
                const html = `<div class="single-cart"><div class="cart-img"><a href="/book/${book.id}"><img src="${book.image}" alt="book" /></a></div><div class="cart-info"><h5><a href="/book/${book.id}">${book.title}</a></h5><p>${book.quantity} x ${book.price} đ</p></div><div class="cart-icon"><a onclick="deleteCartDetail(${book.id})" href="#"><i class="fa fa-remove"></i></a></div></div>`
                $('.cart-product').append(html)
            })
            $('.cart-size').text(res.length)
            $('.cart-totals span').text(total + ' đ')
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const updateCartDetails = () => {
    $('.quantity-value').each((idx, e) => {
        const quantity = $(e).val()
        const id = $(e).attr('data-id')
        const data = { quantity }

        $.ajax({
            type: "PUT",
            url: `http://localhost:8000/cart/cartDetail/${id}`, 
            data,
            async: true, 
            success: (res) => {
                console.log(res)
            },
            error: (err) => {
                return alert(err.responseJSON.msg)
            }
        })
    })
    location.reload()
}

const deleteCartDetail = (id) => {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8000/cart/cartDetail/${id}`,
        async: false,
        success: (res) => {
            getCartDetails()
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const deleteCart = () => {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8000/cart`,
        async: false,
        success: (res) => {
            console.log(res)
            window.location.reload()
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const getCoupon = () => {
    const code = $('#coupon').val()

    $.ajax({
        url: `http://localhost:8000/coupon/${code}`,
        async: false,
        success: (res) => {
            console.log(res)
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const insertOrderDetail = (bookId, quantity, price) => {
    const data = { bookId, quantity, price }
    
    $.ajax({
        type: "POST",
        url: `http://localhost:8000/order/orderDetail`, 
        data,
        async: true, 
        success: (res) => {
            console.log(res)
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const insertOrder = () => {
    const data = {
        shippingId: $('.shipping:checked').val(),
        coupon: $('#coupon').val(),
        note: $('#checkout-mess').val()
    }

    $.ajax({
        type: "POST",
        url: `http://localhost:8000/order`,
        async: false,
        data,
        success: (res) => {
            $('.cart_item').each((idx, e) => {
                const bookId = $(e).find('.product-name').attr('data-id')
                const quantity = $(e).find('.product-quantity').text()
                const price = $(e).find('.amount').text()
        
                insertOrderDetail(bookId, quantity, price)
            })
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const getBooks = () => {
    const min = $('.input-min').val()
    const max = $('.input-max').val()

    window.location.href = `http://localhost:8000/book?minPrice=${min}&maxPrice=${max}`
}

const insertBook = () => {
    const selectedFile = document.querySelector('#img').files[0]       

    const reader = new FileReader()
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {

        const data = {
            categoryId: $('#category').find(":selected").val(),
            title: $('#title').val(),
            longDescription: $('#long-desc').val(),
            shortDescription: $('#short-desc').val(),
            skucode: $('#sku').val(),
            quantity: $('#qty').val(),
            priceIn: $('#price-in').val(),
            priceOut: $('#price-out').val(),
            sale: $('#sale').val(),
            image: reader.result,
        }

        $.ajax({
            type: "POST",
            url: `http://localhost:8000/book/`,
            async: false,
            data,
            success: (res) => {
                console.log(res)
            },
            error: (err) => {
                return alert(err.responseJSON.msg)
            }
        })
    }
    reader.onerror = () => {
        console.error('File Reader Error')
        setErrMsg('something went wrong!')
    }      
}

const updateBook = () => {
        const id = $('#book-id').val()
        const data = {
            categoryId: $('#category').find(":selected").val(),
            title: $('#title').val(),
            longDescription: $('#long-desc').val(),
            shortDescription: $('#short-desc').val(),
            skucode: $('#sku').val(),
            quantity: $('#qty').val(),
            priceIn: $('#price-in').val(),
            priceOut: $('#price-out').val(),
            sale: $('#sale').val()
        }

        $.ajax({
            type: "PUT",
            url: `http://localhost:8000/book/${id}`,
            async: false,
            data,
            success: (res) => {
                window.location.href = "/admin/book"
            },
            error: (err) => {
                return alert(err.responseJSON.msg)
            }
        })
    
}

const deleteBook = () => {
    const id = $('#book-id').val()

    $.ajax({
        type: "DELETE",
        url: `http://localhost:8000/book/${id}`,
        async: false,
        success: (res) => {
            window.location.href = "/admin/book"
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const deleteUser = () => {
    const id = $('#user-id').val()

    $.ajax({
        type: "DELETE",
        url: `http://localhost:8000/account/${id}`,
        async: false,
        success: (res) => {
            window.location.href = "/admin/user"
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })

}

const login = (path) => {
    const formData = {
        username: $("#username").val(),
        password: $("#password").val()
    }

    if (!username || !password) return window.alert('Please fill all the required blank')

    $.ajax({
        type: "POST",
        url: `/${path}/login`,
        async: false,
        data: formData,
        success: (res) => {
            delete_cookie('token')
            set_cookie('token', res.token)
            window.location.href = `/${path}`
        },
        error: (err) => {
            return alert(err.responseJSON.msg)
        }
    })
}

const signup = () => {
    const username = $("#username").val().trim(),
        password = $("#password").val().trim(),
        cfpassword = $("#cfpassword").val().trim(),
        firstName = $("#first_name").val().trim(), 
        lastName = $("#first_name").val().trim(), 
        email = $("#email").val().trim(), 
        companyName = $("#company_name").val().trim(), 
        country = $("#country").val().trim(),
        phone = $("#phone").val().trim(), 
        address = $("#address").val().trim(), 
        city = $("#city").val().trim(), 
        state = $("#state").val().trim(), 
        postcode = $("#postcode").val().trim()

    const formData = { username, password, cfpassword, firstName, lastName, email, companyName, country, phone, address, city, state, postcode }
         
    if (!username || !password || !cfpassword || !firstName || !lastName || !email || !country || !phone || !address || !city || !state || !postcode) return window.alert('Please fill all the required blank')
    if (password !== cfpassword) return window.alert('Password not match!')

    $.ajax({
        type: "POST",
        url: "/account/signup",
        async: false,
        data: formData,
        success: (res) => {
            delete_cookie('token')
            set_cookie('token', res.token)
            // window.location.href = "/account"
        },
        error: (err) => {          
            return alert(err.responseJSON.msg)
        }
    })
}

const set_cookie = (name, value) => {
    document.cookie = name +'='+ value +'; Path=/;';
}

const delete_cookie = (name) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const logout = (path) => {
    delete_cookie('token')
    window.location.href = `/${path}/login`    
}