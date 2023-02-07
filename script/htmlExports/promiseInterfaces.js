export const createPromiseHtml = `
<summary class="menuTitles fontTitle" >Create</summary>
<form id="createSmartPromiseInterface" class="bottomInterface">

    <input type="text" id="promiseTitle" name="promiseTitle" class="inputStyling" placeholder="Title for your promise"></input>
    <input type="number" id="promiseCollateral" name="promiseCollateral" class="inputStyling" placeholder="Promise collateral" step="0.000000000000000001"></input>
    <button id="createPromiseBtn" class="interfaceBtns" type="button"><p>Create Promise</p><img class="interfaceIcon" src="../imgs/createIcon.png"> </button>
    <p id="successfulPromiseUID"  class="sectionOneSmallText" >

</form>`

export const joinPromiseHtml = `
<summary class="menuTitles fontTitle">Join</summary>

<form id="joinSmartPromiseInterface" class="bottomInterface">

    <input type="text" id="promiseID" class="inputStyling" placeholder="ID of active Promise"></input>
    <p class="interfaceTxt" id="joinPromiseSearchOutput">Promise Details Will Be Displayed here</p>
    <button id="joinPromiseBtn" class="interfaceBtns" type="button"><p id="joinP">Search Promise</p><img class="interfaceIcon" src="../imgs/joinIcon.png"></button>

</form>`

export const endPromiseHtml = `
<summary class="menuTitles fontTitle">End</summary>

<form id="endSmartPromiseInterface" class="bottomInterface">

    <input type="text" id="promiseIDToEnd" class="inputStyling" placeholder="ID to end Promise"></input>
    <div class="interfaceSelectDiv">
        <p class="interfaceTxt">Select desired action</p>
        <select class="interfaceSelect" id="endSelect"> 
            <option value="sign" id="signPromiseOption">Sign Promise</option>
            <option value="end" id="endPromiseOption">End Promise</option>
        </select>
    </div>
    <button id="endPromiseBtn" class="interfaceBtns" type="button"><p id="endP">Sign Promise</p><img class="interfaceIcon" src="../imgs/endIcon.png"></button>

</form>`

export const searchPromiseHtml = `
<summary class="menuTitles fontTitle" >Search</summary>

<form id="searchSmartPromiseInterface" class="bottomInterface">

	<input type="text" id="promiseId" name="promiseTitle" class="inputStyling" placeholder="Promise ID"></input>
    <p class="interfaceTxt" id="searchOutput">Promise participants and Promise Title Displayed here</p>
	<button id="searchPromiseBtn" class="interfaceBtns" type="button"><p>Search</p><img class="interfaceIcon" src="../imgs/searchIcon.png"></button>

</form>`