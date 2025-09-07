// app/(course)/courses/[courseId]/pay/page.tsx
import { processPayment } from "./actions";
// import { useRouter } from "next/navigation";

export default async function PayPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  try {
    const result = await processPayment((await params).courseId);
    console.log("Payment result:", result);
    return (
      <div>
        <h1>Payment for Course {(await params).courseId}</h1>
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
}
