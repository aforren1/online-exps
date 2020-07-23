
var url = new URL(window.location.href);
var val = url.searchParams.get("user");
if (val !== null) {
    console.log(val);
}
else {
    console.log("'user' not detected in URL.")
}
