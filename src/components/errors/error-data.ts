export interface ErrorPageConfig {
  code: string;
  name: string;
  title: string;
  description: string;
  accent: string;
  showTrail?: boolean;
}

export const ERROR_PAGES_CONFIG: Record<string, ErrorPageConfig> = {
  "400": {
    code: "400",
    name: "BAD REQUEST",
    title: "Bad Request",
    description: "The server could not understand the request due to invalid syntax or parameters.",
    accent: "#3685FF",
  },
  "401": {
    code: "401",
    name: "AUTHENTICATION REQUIRED",
    title: "Authentication Required",
    description: "Sign in to verify your identity and continue.",
    accent: "#FFB020",
  },
  "402": {
    code: "402",
    name: "PAYMENT REQUIRED",
    title: "Payment Required",
    description: "Access to this resource requires an active subscription or completed payment.",
    accent: "#A855F7",
  },
  "403": {
    code: "403",
    name: "ACCESS FORBIDDEN",
    title: "Access Forbidden",
    description: "You don't have permission to access this destination.",
    accent: "#FF365D",
  },
  "404": {
    code: "404",
    name: "PAGE NOT FOUND",
    title: "This page wandered beyond what exists.",
    description: "The path you followed doesn't exist yet. Let's return to the latest research and intelligence.",
    accent: "#00F0FF",
    showTrail: true,
  },
  "405": {
    code: "405",
    name: "METHOD NOT ALLOWED",
    title: "Method Not Allowed",
    description: "The requested HTTP method is not supported for this resource.",
    accent: "#00D6B2",
  },
  "408": {
    code: "408",
    name: "REQUEST TIMEOUT",
    title: "Request Timeout",
    description: "The connection timed out while waiting for the request to complete.",
    accent: "#7AA8FF",
  },
  "409": {
    code: "409",
    name: "CONFLICT",
    title: "State Conflict",
    description: "The request conflicts with the current state of the target resource.",
    accent: "#FF5C8A",
  },
  "410": {
    code: "410",
    name: "GONE",
    title: "Resource Gone",
    description: "The requested resource has been permanently removed and is no longer available.",
    accent: "#B8C4D9",
  },
  "413": {
    code: "413",
    name: "PAYLOAD TOO LARGE",
    title: "Payload Too Large",
    description: "The request data exceeds the maximum allowable capacity.",
    accent: "#FF6A00",
  },
  "418": {
    code: "418",
    name: "I'M A TEAPOT",
    title: "I'm a Teapot",
    description: "The server refuses the attempt to brew coffee with a teapot.",
    accent: "#B8FF35",
  },
  "422": {
    code: "422",
    name: "UNPROCESSABLE ENTITY",
    title: "Unprocessable Entity",
    description: "The request was well-formed but contains semantic errors.",
    accent: "#FF786B",
  },
  "429": {
    code: "429",
    name: "TOO MANY REQUESTS",
    title: "Too Many Requests",
    description: "You've reached the request limit. Please wait before trying again.",
    accent: "#FF4500",
  },
  "500": {
    code: "500",
    name: "INTERNAL SERVER ERROR",
    title: "Something Went Wrong",
    description: "An unexpected internal error disrupted this request.",
    accent: "#FF00C8",
  },
  "501": {
    code: "501",
    name: "NOT IMPLEMENTED",
    title: "Not Implemented",
    description: "The requested capability is not yet supported by this server.",
    accent: "#C084FC",
  },
  "502": {
    code: "502",
    name: "BAD GATEWAY",
    title: "Bad Gateway",
    description: "The gateway received an invalid response from an upstream server.",
    accent: "#00D9FF",
  },
  "503": {
    code: "503",
    name: "SERVICE UNAVAILABLE",
    title: "Service Temporarily Unavailable",
    description: "Our systems are temporarily unavailable. Please try again shortly.",
    accent: "#00E5A8",
  },
  "504": {
    code: "504",
    name: "GATEWAY TIMEOUT",
    title: "Gateway Timeout",
    description: "The upstream server took too long to respond.",
    accent: "#65C7FF",
  },
};
