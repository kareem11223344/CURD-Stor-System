let ProductNameInput = document.getElementById('ProductName');
let ProductPriceInput = document.getElementById('ProductPrice');
let ProductCategoryInput = document.getElementById('ProductCategory');
let ProductDescInput = document.getElementById('ProductDesc')
let ProductImgInput = document.getElementById('ProductImage')
let rowData = document.getElementById('rowData');
let searchTerm = document.getElementById('searchTerm');

let addBtn = document.getElementById('addBtn')
let updateBtn = document.getElementById('updateBtn')

let productList ;
if(localStorage.getItem("product")!=null){
    productList = JSON.parse(localStorage.getItem('product'));
    displayProduct()
}else{
    productList = [];
}

function addProduct(){
    product = {
        name : ProductNameInput.value,
        price : ProductPriceInput.value,
        category : ProductCategoryInput.value,
        desc : ProductDescInput.value,
        image : `image/product/${ProductImgInput.files[0]?.name}`,
    }
    
    // console.log(product);
    productList.push(product)
    // console.log(productList);
    localStorage.setItem('product', JSON.stringify(productList));
    
    displayProduct()
    clearData()
}


function displayProduct(){
    let addData = ``;
    for(let i = 0; i < productList.length; i++){
        addData += `
            <div class="col-lg-3 col-sm-6">
                <div class="card mt-3 border-0">
                    <img src=${productList[i].image} alt="image/" class="card-img-top">
                    <div class="card-body-6 ms-3">
                        <h5 class="name">Name: ${productList[i].name}</h5>
                        <h6 class="price">Price: ${productList[i].price}</h6>
                        <span class="category">Type: ${productList[i].category}</span>
                        <p class="desc">${productList[i].desc}</p>
                    </div>
                    <button onclick="deleteProduct(${i})" class=" btn btn-outline-info btn-sm mt-2 mx-auto mb-2 w-100 text-center">Delete</button>
                    <button onclick="setUpdateProduct(${i})" class=" btn btn-outline-info btn-sm mt-2 mx-auto mb-2 w-100 text-center">updata</button>
                </div>
            </div>
        `
    }
    rowData.innerHTML = addData;
}

function clearData(){
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescInput.value = ""; 
    ProductImgInput.value = ""; 
}

// Create Delete 
function deleteProduct(index){
    productList.splice(index , 1);
    // productList = JSON.parse(localStorage.getItem('product'));
    localStorage.setItem('product', JSON.stringify(productList));
    displayProduct()
}

// Create Update 


function setUpdateProduct(updateIndex){
    
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    
    currentIndex = updateIndex;
    
    ProductNameInput.value = productList[updateIndex].name;
    ProductPriceInput.value = productList[updateIndex].price;
    ProductCategoryInput.value = productList[updateIndex].category;
    ProductDescInput.value = productList[updateIndex].desc;
}


let currentIndex ;
function updateProduct(i){
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');

    productList[currentIndex].name = ProductNameInput.value;
    productList[currentIndex].price = ProductPriceInput.value;
    productList[currentIndex].category = ProductCategoryInput.value;
    productList[currentIndex].desc = ProductDescInput.value;

    localStorage.setItem("product", JSON.stringify(productList));
    displayProduct()
    clearData()
    
}

// Create Search 
function searchProduct(){
    
    let addData = ``;
    for(let i = 0; i < productList.length; i++){

        if(productList[i].name.toLowerCase().includes(searchTerm.value.toLowerCase()) == true){

            addData += `
                <div class="col-lg-3 col-sm-6">
                    <div class="card mt-3">
                        <img src="image/06.jpg" alt="image/" class="card-img-top">
                        <div class="card-body-6 ms-3">
                            <h5 class="name">Name: ${productList[i].name}</h5>
                            <h6 class="price">Price: ${productList[i].price}</h6>
                            <span class="category">Type: ${productList[i].category}</span>
                            <p class="desc">${productList[i].desc}</p>
                        </div>
                        <button onclick="deleteProduct(${i})" class=" btn btn-outline-info btn-sm mt-2 mx-auto mb-2 w-100 text-center">Delete</button>
                        <button onclick="setUpdateProduct(${i})" class=" btn btn-outline-info btn-sm mt-2 mx-auto mb-2 w-100 text-center">updata</button>
                    </div>
                </div>
            `
        }
       
    }
    rowData.innerHTML = addData;
}
