exports.createBudget = async (req, res) => {

    /// json structure
    const budget = {
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }
    ///
    return
}

exports.getBudgets = async (req, res) => {
    // db query 

    const budgets = [{
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }, {
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }, {
        category: "Entertainment",
        maximum: 50,
        theme: "#277C78"
    }]

    return budgets
}

exports.updateBudget = async (req, res) => {
    return
}

exports.deleteBudget = async (req, res) => {
    return
}