
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our ATS System</h1>
        <p className="text-xl text-gray-600 mb-8">Find your dream job and apply with ease</p>
        <Link to="/apply">
          <Button size="lg">Apply Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
