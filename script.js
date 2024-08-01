function add() {
    const nm = document.getElementById("name");
    const amt = document.getElementById("amnt");
    const cat = document.getElementById("category");
    const date = document.getElementById("date");
    const tb = document.getElementById("tab1");

    const n = nm.value;
    const a = parseFloat(amt.value);
    const c = cat.value;
    const d = date.value;

    if (n === "") {
        alert("Enter Your Name");
        return;
    } else if (isNaN(a)) {
        alert("Enter the Amount Spent");
        return;
    } else if (c === "") {
        alert("Select the Category");
        return;
    } else if (d === "") {
        alert("Select the Date");
        return;
    }

    const trow = document.createElement("tr");
    const tname = document.createElement("td");
    const tamount = document.createElement("td");
    const tcategory = document.createElement("td");
    const tdate = document.createElement("td");
    const tactions = document.createElement("td");

    const editbtn = document.createElement("a");
    editbtn.textContent = "Edit";
    editbtn.style.marginRight = "10px";
    editbtn.style.cursor="pointer";
    editbtn.style.color="Green";
    editbtn.onclick = function() {
        editExpense(trow);
    };

    const dltbtn = document.createElement("a");
    dltbtn.textContent = "Delete";
    dltbtn.style.cursor="pointer";
    dltbtn.style.color="Red";
    dltbtn.style.marginLeft = "20px";
    dltbtn.onclick = function() {
        trow.remove();
        updateTotal();
    };

    tactions.appendChild(editbtn);
    tactions.appendChild(dltbtn);

    trow.appendChild(tname);
    trow.appendChild(tamount);
    trow.appendChild(tcategory);
    trow.appendChild(tdate);
    trow.appendChild(tactions);

    tname.textContent = n;
    tamount.textContent = a.toFixed(2);
    tcategory.textContent = c;
    tdate.textContent = d;

    tb.appendChild(trow);
    updateTotal();

    nm.value = "";
    amt.value = "";
    cat.value = "";
    date.value = "";
}

function updateTotal() {
    const tb = document.getElementById("tab1");
    const rows = tb.getElementsByTagName("tr");
    let total = 0;

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        if (cells.length > 1) {
            const amount = parseFloat(cells[1].textContent);
            if (!isNaN(amount)) {
                total += amount;
            }
        }
    }

    document.getElementById("tot").textContent = total.toFixed(2);
}

function filterExpenses() {
    const filter = document.getElementById("filter").value;
    const tb = document.getElementById("tab1");
    const rows = tb.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        if (cells.length > 1) {
            const category = cells[2].textContent;
            if (filter === "All" || category === filter) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function editExpense(row) {
    const cells = row.getElementsByTagName("td");
    const name = cells[0].textContent;
    const amount = cells[1].textContent;
    const category = cells[2].textContent;
    const date = cells[3].textContent;

    document.getElementById("name").value = name;
    document.getElementById("amnt").value = amount;
    document.getElementById("category").value = category;
    document.getElementById("date").value = date;

    row.remove();
    updateTotal();
}
