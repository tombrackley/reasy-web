// Waitlist forms live at the bottom of the homepage (/new-home), one per
// audience. On the homepage itself the generic link just scrolls there in the
// current view; elsewhere it loads the homepage.
export const WAITLIST_HREF = window.location.pathname === "/new-home" ? "#get-started" : "/new-home#get-started"
export const SELLER_WAITLIST_HREF = "/new-home?for=selling#get-started"
export const BUYER_WAITLIST_HREF = "/new-home?for=buying#get-started"
