export const createPromiseHtml = `
<summary class="menuTitles fontTitle" >Create</summary>
<form id="createSmartPromiseInterface" class="bottomInterface">

    <input type="text" id="promiseTitle" name="promiseTitle" class="inputStyling" placeholder="Title for your promise"></input>
    <input type="number" id="promiseCollateral" name="promiseCollateral" class="inputStyling" placeholder="Promise collateral" step="0.000000000000000001"></input>
    <button id="createPromiseBtn" class="interfaceBtns" type="button">Create Promise </button>

</form>`

export const joinPromiseHtml = `
<summary class="menuTitles fontTitle">Join</summary>

<form id="joinSmartPromiseInterface" class="bottomInterface">

    <input type="text" id="promiseID" class="inputStyling" placeholder="ID of active Promise"></input>
    <input type="number" id="promiseMatchCollateral" class="inputStyling font" placeholder="Promise collateral" step="0.000000000000000001"></input>
    <button id="joinPromiseBtn" class="interfaceBtns" type="button">Join Promise </button>

</form>`

export const endPromiseHtml = `
<summary class="menuTitles fontTitle">End</summary>

<form id="endSmartPromiseInterface" class="bottomInterface">

    <input type="text" id="promiseIDToEnd" class="inputStyling" placeholder="ID to end Promise"></input>
    <button id="endPromiseBtn" class="interfaceBtns" type="button">End Promise </button>

</form>`

export const searchPromiseHtml = `
<summary class="menuTitles fontTitle" >Search</summary>

<form id="searchSmartPromiseInterface" class="bottomInterface">

	<input type="text" id="promiseId" name="promiseTitle" class="inputStyling" placeholder="Promise ID"></input>
    <p class="interfaceTxt" id="searchOutput">Promise participants and Promise Title Displayed here</p>
	<button id="searchPromiseBtn" class="interfaceBtns" type="button">Search </button>

</form>`