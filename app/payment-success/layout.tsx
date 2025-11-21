"use client";

import {FC, ReactNode} from "react";

const PaymentSuccessLayout: FC<{ children: ReactNode }> = ({children}) => {
    return <div className="container h-screen content-center">
        {children}
    </div>
}

export default PaymentSuccessLayout