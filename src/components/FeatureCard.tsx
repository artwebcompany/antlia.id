
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  const IconComponent = LucideIcons[icon] as LucideIcon;
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 overflow-hidden animate-on-scroll" style={{animationDelay: `${delay}ms`}}>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4 p-2 bg-antlia-blue/10 rounded-lg">
            {IconComponent && <IconComponent className="w-6 h-6 text-antlia-blue" />}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
