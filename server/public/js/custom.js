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
        countryId: $('#country').val(),
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
            url: `http://localhost:8000/admin/book/create`,
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
            url: `http://localhost:8000/admin/book/${id}`,
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

const set_cookie = (name, value) => {
    document.cookie = name +'='+ value +'; Path=/;';
}

const delete_cookie = (name) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const logout = () => {
    delete_cookie('token')
    window.location.href = '/account/login'    
}