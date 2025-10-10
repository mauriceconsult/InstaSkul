import { processPayment } from "./actions";
import { NextPage } from "next";

type PayPageProps = {
  params: Promise<{ courseId: string }>;
};

const PayPage: NextPage<PayPageProps> = async ({ params }) => {
  try {
    const { courseId } = await params;
    console.log("Pay page courseId:", courseId);
    const result = await processPayment(courseId);
    console.log("Payment result:", result);
    return (
      <div>
        <h1>Payment for Course {courseId}</h1>
        <p>Payment {result.success ? "successful" : "failed"}</p>
      </div>
    );
  } catch (error) {
    console.error("Pay page error:", error);
    return (
      <div>
        <h1>Payment Error</h1>
        <p>Failed to process payment. Please try again.</p>
      </div>
    );
  }
};

export default PayPage;
