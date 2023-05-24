const form = document.getElementById('list-form')
const productName = form.querySelector('input[name="product_name"]')
const productQty = form.querySelector('input[name="quantity"]')
const submitBTN = form.querySelector('#form-button')
const grocery_list = document.getElementById('grocery_list')
const itemNode = document.createElement('div')
             itemNode.classList.add('list-item')
             itemNode.innerHTML = ` <div class="product_check">
                                    <input type="checkbox" name="check_inpt" value="0">
                                    <label for=""></label>
                                </div>
                                <div class="product_name">Sample Product</div>
                                <div class="product_qty">x4</div>
                                <div class="product_action">
                                    <a href="#" class="rem-item" data="0"><i class="fa fa-trash"></i></a>
                                </div>`;

let listData = JSON.parse(localStorage.getItem('grocery_list')) || []

form.addEventListener('submit', function(e){
    e.preventDefault()
    submitBTN.disabled = true
    var new_data = {
        product_name :  productName.value,
        product_qty :  productQty.value,
        is_checked :  false,
    }
    listData.push(new_data)
    localStorage.setItem('grocery_list', JSON.stringify(listData))
    submitBTN.disabled = false
    form.reset()
    loadData();
})

const loadData = () =>{
    listData = JSON.parse(localStorage.getItem('grocery_list')) || []
    grocery_list.innerHTML = ``;
    if(listData.length > 0){
        listData.forEach((data, indx) => {
            var Item = itemNode.cloneNode(true)
          
            Item.querySelector('.product_check input[type="checkbox"]').value = indx;
            Item.querySelector('.product_check input[type="checkbox"]').setAttribute('value', indx);
            Item.querySelector('.product_name').innerText  = data.product_name
            Item.querySelector('.product_qty').innerText  = 'x' + data.product_qty
            if(!!data.is_checked && data.is_checked == true){
                Item.querySelector('.product_check input[type="checkbox"]').checked = true;
                if(!Item.classList.contains('checked'))
                Item.classList.add('checked')
            }else{
                Item.querySelector('.product_check input[type="checkbox"]').checked = false;
                if(!!Item.classList.contains('checked'))
                Item.classList.remove('checked');

            }
            grocery_list.appendChild(Item)

            Item.querySelector('.product_check label').addEventListener('click', e=>{
                e.preventDefault()
                triggerCheck(Item,indx)
            })
            Item.querySelector('.product_name').addEventListener('click', e=>{
                e.preventDefault()
                triggerCheck(Item,indx)
            })
            Item.querySelector('.rem-item').addEventListener('click', e=>{
                e.preventDefault()
                DeleteItem(Item,indx)
            })
        })
    }
}

const triggerCheck = (item,idx) =>{
    console.log(item.querySelector('.product_check input[type="checkbox"]').checked)
    if(item.querySelector('.product_check input[type="checkbox"]').checked == false){
        item.querySelector('.product_check input[type="checkbox"]').checked = true
        if(!item.classList.contains('checked'))
        item.classList.add('checked')
        if(!!listData[idx]){
            listData[idx].is_checked = true
        }
    }else{
        item.querySelector('.product_check input[type="checkbox"]').checked = false
        if(item.classList.contains('checked'))
        item.classList.remove('checked')  
        if(!!listData[idx]){
            listData[idx].is_checked = false
        }
    }
    localStorage.setItem('grocery_list', JSON.stringify(listData))
    loadData();
}

const DeleteItem = (item, idx)=>{
    if(confirm(`Are you sure to remove this grocery list item permanently?`) == true){
        item.remove()
        if(!!listData[idx])
            delete listData[idx]
        listData = listData.filter(data => data)
        localStorage.setItem('grocery_list', JSON.stringify(listData))
        loadData();
    }
}

window.onload= function(){
    loadData()
}