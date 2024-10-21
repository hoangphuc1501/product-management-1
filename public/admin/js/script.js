// Bộ lọc
const boxFilter = document.querySelector("[box-filter]");

if (boxFilter) {
    let url = new URL(location.href) // nhân bản đường link

    // bắt sự kiện onchange
    boxFilter.addEventListener("change", () => {
        const value = boxFilter.value

        if (value) {
            url.searchParams.set("status", value); // thêm thuộc tính
        } else {
            url.searchParams.delete("status"); // xóa thuộc tính
        } // kiểm tra xem có gửi lên hay không

        location.href = url.href; // chuyển hướng đến đường link mới
    })
    // hiển thị lựa chọn mặc định

    const statusCurrent = url.searchParams.get("status");
    if (statusCurrent) {
        boxFilter.value = statusCurrent;
    }
}
// hết bộ lọc

// Tìm kiếm
const formSearch = document.querySelector("[form-search]");
if (formSearch) {

    let url = new URL(location.href) // nhân bản đường link
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault(); // ngăn chặn hành vi mặc định: submit fomr chuyển hướng đi
        const value = formSearch.keyword.value;
        if (value) {
            url.searchParams.set("keyword", value);
        } else {
            url.searchParams.delete("keyword");
        }
        location.href = url.href; // chuyển hướng đến đường link mới
    })
    // hiển thị từ khóa mặc định
    const valueCurrent = url.searchParams.get("keyword");
    if (valueCurrent) {
        formSearch.keyword.value = valueCurrent;
    }


}
// hết tìm kiếm

// phân trang
const listButtonPanigation = document.querySelectorAll("[button-pagination]");
if (listButtonPanigation.length > 0) {
    let url = new URL(location.href);

    listButtonPanigation.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }

            location.href = url.href
        })
    })
    // hiển thị trang mặc định
    const pageCurrent = url.searchParams.get("page") || 1;
    const buttonCurrent = document.querySelector(`[button-pagination="${pageCurrent}"]`);
    if (buttonCurrent) {
        buttonCurrent.parentNode.classList.add("active");
    }
}
// hết phần trang

// Đổi trạng thái
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0) {
    listButtonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("item-id")
            const statusChange = button.getAttribute("button-change-status")
            const path = button.getAttribute("data-path")
            const data = {
                id: itemId,
                status: statusChange
            }
            fetch(path, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                if(data.code == "success"){
                    location.reload();
                }
            })
        })
    })
}
// hết đổi trạng thái

// Đổi trạng thái nhiều bản ghi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event) =>{
        event.preventDefault();
        const path = formChangeMulti.getAttribute("data-path")
        const status = formChangeMulti.status.value;

        if(status == "delete"){
            const isComfirm = confirm("Bạn có chắc chắn muốn xóa không");
            if(!isComfirm){
                return;
            }
        }

        ids = [];
        const listInputChangeChecked = document.querySelectorAll("[input-change]:checked")
        listInputChangeChecked.forEach((input) => {
            const id = input.getAttribute("input-change");
            ids.push(id);
            const data = {
                ids: ids,
                status: status
            };
            fetch(path, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == "success"){
                        location.reload();
                    }
                })
        });
    })
}
// hết đổi trạng thái nhiều bản ghi

// Xóa bản ghi
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0){
    listButtonDelete.forEach((button) => {
        button.addEventListener("click", () =>{
            const isComfirm = confirm("Bạn có chắc xóa bản ghi này");
            if(isComfirm){
                const path = button.getAttribute("data-path")
            const id = button.getAttribute("item-id");
            
            fetch(path,{
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify({
                    id: id
                })
            })
            .then(res => res.json())
            .then(id => {
                if(id.code == "success"){
                    location.reload();
                }
            })
            }
        })
    })
}
// Hết xóa bản ghi

// Đổi vị trí
    const ListInputPosition = document.querySelectorAll("[input-position]");
    if(ListInputPosition.length > 0) {
        ListInputPosition.forEach((input) => {
            input.addEventListener("change", () => {
                const path = input.getAttribute("data-path");
                const position = parseInt(input.value);
                const id = input.getAttribute("item-id");

                const data = {
                    id: id,
                    position: position
                }

                fetch(path,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PATCH",
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(id => {
                    if(id.code == "success"){
                        location.reload();
                    }
                })

            })
        })
    }
// hết đổi vị trí

// alert-message
    const alertMessage = document.querySelector("[alert-message]");
    if(alertMessage){
        setTimeout(() => {
            alertMessage.style.display = "none";
        }, 3000);
    }
// hết alert-message