import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { config } from "@/config";
import { useNavigate } from "react-router-dom";
import { Clock, DollarSign, ChevronRight, Star } from "lucide-react";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const filteredServices =
    activeTab === "all"
      ? config.services
      : activeTab === "featured"
        ? config.services.filter((service) => service.featured)
        : config.services;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0A2647]">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive eye care services using the latest technology and
              techniques to ensure the best outcomes for our patients.
            </p>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-8"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center mb-6">
              <TabsList className="bg-blue-50">
                <TabsTrigger value="all" className="px-6">
                  All Services
                </TabsTrigger>
                <TabsTrigger value="featured" className="px-6">
                  Featured
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    onDetailsClick={() => setOpenServiceId(service.id)}
                    onBookClick={() => navigate("/book")}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    onDetailsClick={() => setOpenServiceId(service.id)}
                    onBookClick={() => navigate("/book")}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Service Details Dialog */}
          {config.services.map((service) => (
            <Dialog
              key={service.id}
              open={openServiceId === service.id}
              onOpenChange={() => setOpenServiceId(null)}
            >
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-4xl">{service.icon}</div>
                    <DialogTitle className="text-2xl">
                      {service.title}
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-base">
                    {service.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span>{service.price}</span>
                    </div>
                    {service.featured && (
                      <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span>Featured Service</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      What's Included
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg
                              className="h-3 w-3 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={() => {
                        setOpenServiceId(null);
                        navigate("/book");
                      }}
                    >
                      Book This Service
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-[#0A2647] to-[#1B4B7A] rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Schedule Your Appointment?
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our team of experienced professionals is ready to provide you with
              the highest quality eye care services.
            </p>
            <Button
              onClick={() => navigate("/book")}
              size="lg"
              className="bg-white text-[#0A2647] hover:bg-blue-50"
            >
              Book an Appointment
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: any;
  index: number;
  onDetailsClick: () => void;
  onBookClick: () => void;
}

const ServiceCard = ({
  service,
  index,
  onDetailsClick,
  onBookClick,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-[#0A2647]">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="text-4xl mb-3">{service.icon}</div>
            {service.featured && (
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                Featured
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl text-[#0A2647]">
            {service.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{service.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>{service.price}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-3 border-t">
          <Button variant="ghost" size="sm" onClick={onDetailsClick}>
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm" onClick={onBookClick}>
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServicesPage;
