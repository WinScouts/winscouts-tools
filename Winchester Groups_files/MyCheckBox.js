function MyCheckBoxToggleImages(UserControlName) {
  if (UserControlName == '') {
    imgButtonPath = "imgButton"
    hdCheck = "hdChecked"
  } else {
    imgButtonPath = UserControlName + "_imgButton"
    hdCheck = UserControlName + "_hdChecked"
  }
  //
  var imgButton = document.getElementById(imgButtonPath);
  //var imgButton = getElementsStartsWithId(imgButtonPath);
  if (imgButton != null) {
    var imgTickedPath = $("[id$='imgTicked']").attr("src");
    if (imgTickedPath == '') { imgTickedPath = $("[id$='" + UserControlName + "_imgTicked']").attr("src"); }
    var imgTickedDisabledPath = $("[id$='imgTickedDisabled']").attr("src");
    if (imgTickedDisabledPath == '') { imgTickedDisabledPath = $("[id$='" + UserControlName + "_imgTickedDisabled']").attr("src"); }
    var imgUntickedPath = $("[id$='imgUnticked']").attr("src");
    if (imgUntickedPath == '') { imgUntickedPath = $("[id$='" + UserControlName + "_imgUnticked']").attr("src"); }
    //
    if ($("[id$='" + imgButtonPath + "']").attr("src") == imgUntickedPath) {
      if ($("[id$='" + imgButtonPath + "']").attr("disabled") == "disabled") {
        $("[id$='" + imgButtonPath + "']").attr("src", imgTickedDisabledPath);
      }
      else {
        $("[id$='" + imgButtonPath + "']").attr("src", imgTickedPath);
      }
      $("[id$='" + hdCheck + "']").attr("value", "true");
    }
    else {
      $("[id$='" + imgButtonPath + "']").attr("src", imgUntickedPath);
      $("[id$='" + hdCheck + "']").attr("value", "false");
    }
  }
  return false;
}



function getElementsStartsWithId(id) {
  var children = document.body.getElementsByTagName('*');
  var element; // = [], child;
  for (var i = 0, length = children.length; i < length; i++) {
    child = children[i];
    if (child.id.substr(0, id.length) == id)
      //elements.push(child);
      element = document.getElementById(child.id)
  }
  return element;
}