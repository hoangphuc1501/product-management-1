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