export function GetPortNumber(port: number | string | undefined): number {
    return typeof port == "number" ? port    
        : port == "https" ? 443
        : port == "http" ? 80 : 80
}