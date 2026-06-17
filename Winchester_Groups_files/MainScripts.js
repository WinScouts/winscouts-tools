

// Gallery Scripts

function GalleryPrevClicked(UserControlName) {
  var ImageNo = parseInt($("[id$='" + UserControlName + "_hdImageNo" + "']").attr("value"), 10);
  var ImageCount = parseInt($("[id$='" + UserControlName + "_hdImageCount" + "']").attr("value"), 10);
  ImageNo = ImageNo - 1;
  if (ImageNo <= 0) {ImageNo = ImageCount;}
  GallerySetImage(UserControlName, ImageNo);
  return false;
}

function GalleryNextClicked(UserControlName) {
  var ImageNo = parseInt($("[id$='" + UserControlName + "_hdImageNo" + "']").attr("value"), 10);
  var ImageCount = parseInt($("[id$='" + UserControlName + "_hdImageCount" + "']").attr("value"), 10);
  ImageNo = ImageNo + 1;
  if (ImageNo > ImageCount) {ImageNo = 1;}
  GallerySetImage(UserControlName, ImageNo);
  return false;
}

function GallerySetImage(UserControlName, ImageNo) {
  var ImageCount = parseInt($("[id$='" + UserControlName + "_hdImageCount" + "']").attr("value"), 10);
  if (ImageNo >=1 && ImageNo <= ImageCount) {
    var TableRowNo = parseInt((ImageNo - 1) / 5);
    //
    var ImageButton1_ImageURL = $("[id$='" + UserControlName + "_lvFileList_ImageButton1_" + (ImageNo - 1) + "']").attr("src");
    var lblName_Text = document.getElementById(UserControlName + "_lvFileList_lblName_" + (ImageNo - 1)).innerText;
    var lblDescription_Text = document.getElementById(UserControlName + "_lvFileList_lblDescription_" + (ImageNo - 1)).innerText;
    if (lblDescription_Text !== "") { lblDescription_Text = lblDescription_Text + "\u000a"; } // Add CrLf to move next text onto next line
    var lblWhereAndWhen_Text = document.getElementById(UserControlName + "_lvFileList_lblWhereAndWhen_" + (ImageNo - 1)).innerText;
    //
    $("[id$='" + UserControlName + "_imgHeader']").attr("src", ImageButton1_ImageURL);
    document.getElementById(UserControlName + "_lblHeaderImageName").innerText = lblName_Text;
    document.getElementById(UserControlName + "_lblHeaderImageDescription").innerText = lblDescription_Text;
    document.getElementById(UserControlName + "_lblWhereAndWhen").innerText = lblWhereAndWhen_Text;
    //
    $("[id$='" + UserControlName + "_hdImageNo" + "']").attr("value", ImageNo);
  }
  return false;
}



function ShowFileViewWarning(myControl) {
  // This routine is called from ther FileView user control to show a upload speed/size warning
  //
  // Check if UploadSizeWarningDiv is already visible
  //
  var blnWarningShown = false;
  var actualWarningDivId = getFirstElementId('UploadSizeWarningDiv');
  if (document.getElementById(actualWarningDivId).style.display === "none") {
    blnShowWarning = true;
  } else {
    document.getElementById(actualWarningDivId).style.display = "block";
    blnShowWarning = false;
  }
  //
  if (blnShowWarning === true) {
    // Show the warning
    document.getElementById(actualWarningDivId).style.display = "block";
    //
    // Reduce the height of the FileViewTreeViewPanel by 32px
    var actualFileTreeViewPanelDivId = getFirstElementId('FileViewTreeViewPanel');
    var tvHeight = document.getElementById(actualFileTreeViewPanelDivId).style.height;
    var tvHeightInt = tvHeight.replace('px', '');
    document.getElementById(actualFileTreeViewPanelDivId).style.height = (tvHeightInt - 32) + 'px';
    //
    // Show the [Upload & Rezize] button
    document.getElementById(getFirstElementId('btnUploadDiv')).style.display = "block";
    //if (myControl.files.length === 1) {
    if (myControl.files.length === 1 || document.getElementById(getFirstElementId('lblIsSU')).innerText === '1') {
      document.getElementById(getFirstElementId('chkHiRes')).style.display = "block";
      document.getElementById(getFirstElementId('lblCheckboxTitle')).style.display = "block";
    } else {
      document.getElementById(getFirstElementId('chkHiRes')).style.display = "none";
      document.getElementById(getFirstElementId('lblCheckboxTitle')).style.display = "none";
    }
  }
  return false;
}



function getFirstElementId(elementIdString) {
  // Go through the whole page to find the FIRST occurance of an element, Div, button, etc.
  // Returns the full Id of the elemnt on the page or null if not found
  var returnId = null;
  var queryString = "[id$='_" + elementIdString + "']";
  var divList = document.querySelectorAll(queryString);
  for (i = 0; i < divList.length; i++) {
    // var UserControlName = tvDiv.id.substr(0, tvDiv.id.length - 22);
    returnId = divList[i].id;
    break;
  }
  if (returnId === null) {
    // Exact div name
    queryString = "[id$='" + elementIdString + "']";
    divList = document.querySelectorAll(queryString);
    for (i = 0; i < divList.length; i++) {
      returnId = divList[i].id;
      break;
    }
  }
  return returnId;
}



// Header Image Hover - See Product page
function HoverToZoomMouseOver(HoverToZoomDiv) {
  HoverToZoomDiv.children('.HoverToZoomImage').css({ 'transform': 'scale(' + HoverToZoomDiv.attr('data-zoom-scale') + ')' });
}
function HoverToZoomMouseOut(HoverToZoomDiv) {
  HoverToZoomDiv.children('.HoverToZoomImage').css({ 'transform': 'scale(1)' });
}
function HoverToZoomMouseMove(HoverToZoomDiv) {
  var MousePosX = window.event.pageX;
  var MousePosY = window.event.pageY;
  var OriginPosX = (MousePosX - HoverToZoomDiv.offset().left) / HoverToZoomDiv.width() * 100 + '%';
  var OriginPosY = (MousePosY - HoverToZoomDiv.offset().top) / HoverToZoomDiv.height() * 100 + '%';
  HoverToZoomDiv.children('.HoverToZoomImage').css({ 'transform-origin': OriginPosX + ' ' + OriginPosY});
}



// E.g. ScriptManager.RegisterStartupScript(Page, Page.GetType(), "key", "MoveToTopOfThePage();", True)
function MoveToTopOfThePage() {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
}




function ShowGroupForMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      //let lat = position.coords.latitude;
      //let long = position.coords.longitude;
      var lblGroupsLinkURL = document.getElementById(getFirstElementId('lblGroupsLinkURL'));
      location.replace(lblGroupsLinkURL.innerText + position.coords.latitude + "&long=" + position.coords.longitude);
    });
  }
  return false;
}



function SOAccordionToggle(myControl) {
  //<button class="SOAccordion" onclick="SOAccordionToggle(this);return false;">Section 1 long title for a very wide panel title</button>
  //<div class="SOAccordionPanel">
  //  <p>Lorem ipsum...</p>
  //</div>
  $(myControl).toggleClass('SOAccordionPanelActive');
  var panel = myControl.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
  return false;
}



function AddTimeToDateCalendarExtenderSelectedDate(myCalendarExtenderControl) {
  var timedisplay = new Date();
  myCalendarExtenderControl.get_element().value = myCalendarExtenderControl.get_selectedDate().format("dd/MM/yyyy") + " 00:00"; // + timedisplay.format("HH:mm"); for current time //
}



function LoadImagesThatHaventLoad() {
  // Loop through all img's on page - if not loaded, try loading them again. If still fails, show default Scout Logo
  // NB. This won't work on ImageBanners, TeamLists and some LinkLists as the image use background-images
  var imgs = document.getElementsByTagName("img");
  for (var i = 0; i < imgs.length; i++) {
    var LoadedOk = imgs[i].complete && imgs[i].naturalHeight !== 0;
    if (LoadedOk === false && imgs[i].src.length !== 0 && imgs[i].src.includes("?") === false) {
      imgs[i].onerror = function () { this.src = "/Images/SA_Site_Images/ImageNotLoaded.png"; }
      imgs[i].src = imgs[i].src + "?" + new Date().getTime();
    }
  }
}

function LoadFontsThatHaventLoad() {
  if (document.fonts.check('16px NunitoSansBold') === false) {
    var fontlinks = document.getElementsByTagName("link");
    for (var i = 0; i < fontlinks.length; i++) {
      if (fontlinks[i].type === "font/ttf") {
        fontlinks[i].setAttribute("href", fontlinks[i].href + "?" + new Date().getTime());
      }
    }
  }
}

function AddOnErrorCodeToImageButtons() {
  // Add OnError code to reload images for myCheckBox, captcha, calendar buttons, etc. if they fail
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "image" && inputs[i].src.length !== 0 && inputs[i].src.includes("?") === false) {
      inputs[i].onerror = function () { this.src = this.src + "?" + new Date().getTime(); this.onerror = ""; } // Try to load once more only
    }
  }
}



function SetddlCSSClassFromValues(ddl) {
  // Usage: ScriptManager.RegisterStartupScript(Me, Page.GetType, "Script", "SetddlCSSClassFromValues(" & ddlGoogleCalendarCSSClass.ClientID & ");", True)
  for (var i = 0; i < ddl.options.length; i++) {
    var CssClass = ddl.options[i].value;
    if (CssClass != '') {
      ddl.options[i].className = CssClass;
    }
  }
}