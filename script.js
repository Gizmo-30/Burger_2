const product = {
    plainBurger: {
        name:'Гамбергер простой',
        price: 10000,
        kcall: 200,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
    },
    freshBurger: {
        name:'Гамбургер FRESH',
        price: 20500,
        kcall: 300,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
    },
    freshCombo: {
        name:'FRESH COMBO',
        price: 31900,
        kcall: 350,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
    },
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 50,
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 5,
    },
    cheese: {
        name: 'Сыр  ',
        price: 1000,
        kcall: 20,
    },
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

btnPlusOrMinus.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        plusOrMinus(this) 
    })
})

function plusOrMinus(element) {
    /* 
        closest() - это метод объекта. который подключается и получает своего родителя.
        getAttribute() - Получает значение указанного оттрибута с HTML
    */
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        productAmount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        symbol = element.getAttribute('data-symbol');
        
    if(symbol == '+'){
        product[parentId].amount++
    }else if(symbol == '-' && product[parentId].amount > 0){
        product[parentId].amount--
    }
    
    productAmount.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Sum
    kcall.innerHTML = product[parentId].Kcall
    
}

const headerTimer = document.querySelector('.header__timer-extra')

let speed = 15;

function timer(i = 0) {
    headerTimer.innerHTML = i;
    i++
    if (i > 50 && i < 75) {
        speed = 50
    }else if (i > 74 && i < 85) {
        speed = 70
    }else if (i > 84 && i < 95) {
        speed = 130
    } else if ( i > 94) {
        speed = 180
    }
    if(i <= 100) {
        setTimeout(() => {
           timer(i) 
        }, speed);
    }
}

setTimeout(() => {
    timer()
}, 2000);

const checkExtraProduct = document.querySelectorAll('.main__product-checkbox')

checkExtraProduct.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        addExtraProduct(checkbox)
    })
});

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementAttr = element.getAttribute('data-extra');
        let check = element.checked; 
    
        if (check) {
            product[parentId].price += extraProduct[elementAttr].price
            product[parentId].kcall +=  extraProduct[elementAttr].kcall
        }else {
            product[parentId].price -= extraProduct[elementAttr].price
            product[parentId].kcall -=  extraProduct[elementAttr].kcall
        }
        
        price.innerHTML = product[parentId].Sum;
        kcall.innerHTML = product[parentId].Kcall;
}

const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out');
    
    let arrProduct = [],
        totalPrice = 0,
        totalKcall = 0,
        totalName = '';

addCart.addEventListener('click', () => {
    for(const key in product) {
        // console.log(product[key].amount);
        if(product[key].amount > 0) {
            arrProduct.push(product[key])
            // console.log(arrProduct);
            for (const newKey in product[key]) {
                if(product[key][newKey] === true){
                    product[key].name += extraProduct[newKey].name
                }
            }
        }
    }
    
    arrProduct.forEach(product => {
        
    })
})

// addCart.setAttribute('src', src) /* добавления атрибута */

const mainInfo = document.querySelectorAll('.main__product-info'),
    mainImg = document.querySelectorAll('.main__product-img'),
    view = document.querySelector('.view'),
    viewImg = document.querySelector('.view img'),
    xBtn = document.querySelector('.view__close')

mainInfo.forEach((element,i) => {
    element.addEventListener('dblclick', () => {
        view.classList.add('active')
        mainImg.forEach((element, index) => {
            const src = element.getAttribute('src')
            if (i === index) {
                viewImg.setAttribute('src', src)
            }
        })
        xBtn.addEventListener('click', () => {
            view.classList.remove('active')
        })
    })
});
