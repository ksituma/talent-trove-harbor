
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Kenya School of Government</h1>
        <p className="text-xl text-gray-600 mb-8">Find your dream job and apply with ease</p>
        <div className="flex gap-4 justify-center">
          <Link to="/jobs">
            <Button size="lg">View Jobs</Button>
          </Link>
          <Link to="/admin">
            <Button size="lg" variant="outline">Admin Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
