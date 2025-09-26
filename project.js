let transactions = [];

const form = document.getElementById("form");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

function updateUI() {
    list.innerHTML = "";
    let balance = 0, income = 0, expense = 0;

    transactions.forEach((t, index) => {
        let li = document.createElement("li");
        li.className = t.type;
        li.innerHTML = `${t.desc} <span>${t.type === "income" ? "+" : "-"}₹${t.amount}</span>`;

        let delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
            transactions.splice(index, 1);
            updateUI();
        };

        li.appendChild(delBtn);
        list.appendChild(li);

        if (t.type === "income") {
            income += t.amount;
            balance += t.amount;
        } else {
            expense += t.amount;
            balance -= t.amount;
        }
    });

    balanceEl.textContent = balance;
    incomeEl.textContent = income;
    expenseEl.textContent = expense;
}

form.onsubmit = e => {
    e.preventDefault();
    let desc = document.getElementById("desc").value;
    let amount = parseInt(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    transactions.push({ desc, amount, type });
    updateUI();
    form.reset();
};

updateUI();
