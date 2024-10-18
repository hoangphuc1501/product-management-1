// Bộ lọc
const boxFilter = document.querySelector("[box-filter]");

if(boxFilter){
    let url = new URL(location.href) // nhân bản đường link

    // bắt sự kiện onchange
    boxFilter.addEventListener("change", () =>{
        const value = boxFilter.value
    
        if(value) {
            url.searchParams.set("status",value ); // thêm thuộc tính
        }else{
            url.searchParams.delete("status"); // xóa thuộc tính
        } // kiểm tra xem có gửi lên hay không

        location.href = url.href; // chuyển hướng đến đường link mới
    })
    // hiển thị lựa chọn mặc định

    const statusCurrent = url.searchParams.get("status");
    if(statusCurrent) {
        boxFilter.value = statusCurrent;
    }
}
// hết bộ lọc

// Tìm kiếm
    const formSearch = document.querySelector("[form-search]");
    if(formSearch){

        let url = new URL(location.href) // nhân bản đường link
        formSearch.addEventListener("submit", (event) => {
            event.preventDefault(); // ngăn chặn hành vi mặc định: submit fomr chuyển hướng đi
            const value = formSearch.keyword.value;
            if(value){
                url.searchParams.set("keyword", value);
            }else{
                url.searchParams.delete("keyword");
            }
            location.href = url.href; // chuyển hướng đến đường link mới
        })
        // hiển thị từ khóa mặc định
        const valueCurrent = url.searchParams.get("keyword");
        if(valueCurrent) {
            formSearch.keyword.value = valueCurrent;
        }

        
    }
// hết tìm kiếm