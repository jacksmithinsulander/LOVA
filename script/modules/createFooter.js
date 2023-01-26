

export function createFooter(footer) {
    footer = document.createElement("footer");
    footer.id = "footer";
    footer.classList = "footerInfo";
    footer.innerHTML = `
    <nav>
      <ul class="footerUl">
        <li class="footerLi" onclick="location.href = 'https://www.discord.com';"> <i  class="fa-brands fa-discord fa-2xl"></i></li>
        <li class="footerLi" onclick="location.href = 'https://www.twitter.com';"> <i class="fa-brands fa-twitter fa-2xl"></i></li>
        <li class="footerLi" onclick="location.href = 'https://github.com/jacksmithinsulander/smartPromise';"> <i class="fa-brands fa-github fa-2xl"></i></li>
      </ul>
    </nav>`;
    
return footer;
}