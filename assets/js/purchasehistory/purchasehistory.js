document.getElementById('inputfile').addEventListener('change', function () {
    var fr = new FileReader();
    fr.onload = function () {
        handlePurchasesFile(fr.result);
    }
    fr.readAsText(this.files[0]);
})

function handlePurchasesFile(json) {
    var purchases = JSON.parse(json);
    var summary = getPurchasesSummary(purchases);
    var output = document.getElementById('output');
    outputSummaries(output, summary);
}

function getPurchasesSummary(purchases) {
    return purchases.reduce((totals, purchase) => {
        var amount = Number(purchase.purchaseHistory.invoicePrice.replace(/[^0-9.-]+/g, ""));
        if (amount == 0) {
            return totals;
        }

        updateTotals(totals, 'Overall total', "All purchases", amount);

        var type = purchase.purchaseHistory.doc.documentType;
        updateTotals(totals, 'Grouped by purchase type', type, amount);

        var paymentType = purchase.purchaseHistory.paymentMethodTitle;
        paymentType = paymentType.startsWith('Google Play balance') ? 'Google Play balance' : paymentType;
        paymentType = paymentType == '' ? 'Unknown' : paymentType;
        updateTotals(totals, 'Grouped by payment method', paymentType, amount);

        var purchaseTime = new Date(purchase.purchaseHistory.purchaseTime);
        var year = purchaseTime.getFullYear();
        updateTotals(totals, 'Grouped by year', year, amount);

        var hour = purchaseTime.getHours();
        updateTotals(totals, 'Grouped by hour of day', hour, amount);

        var appName = purchase.purchaseHistory.doc.title.match(/\(([^)]*)\)[^(]*$/);
        appName = appName ? appName[1] : purchase.purchaseHistory.doc.title;
        updateTotals(totals, 'Grouped by app', appName, amount);

        return totals;
    }, {});
}

function updateTotals(totals, fieldName, fieldValue, purchaseAmount) {
    if (!totals.hasOwnProperty(fieldName)) {
        totals[fieldName] = {}
    }
    if (!totals[fieldName].hasOwnProperty(fieldValue)) {
        totals[fieldName][fieldValue] = {}
        totals[fieldName][fieldValue]['count'] = 0;
        totals[fieldName][fieldValue]['sum'] = 0
    }
    totals[fieldName][fieldValue]['count']++;
    totals[fieldName][fieldValue]['sum'] += purchaseAmount
}

function outputSummaries(output, summary) {
    output.innerHTML = "";
    for (grouping in summary) {
        var newHTML = '<h2>' + grouping + '</h2>\n';
        newHTML += '<table><tr><th></th><th>Count</th><th>Total</th></tr>\n';
        for (type in summary[grouping]) {
            newHTML += '<tr><td><b>' + type + '</b></td>\n';
            newHTML += '<td>' + summary[grouping][type]['count'] + '</td>\n';
            newHTML += '<td>' + summary[grouping][type]['sum'].toFixed(2) + '</td></tr>\n';
        }
        newHTML += '</table><br>\n';
        output.innerHTML += newHTML;
    }
}