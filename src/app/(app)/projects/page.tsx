"use client";

import PropertyCard from "@/components/ui/propertyCard";
import { HouseCardType } from "@/data/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const ProjectsPage = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<HouseCardType[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const page = 1;
  const limit = 10;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/projects/getProjects?page=${page}&limit=${limit}`,
        );

        setProjects(response.data.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold mb-6">Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <PropertyCard
                key={project.id}
                card={{
                  id: project.id,
                  img: project.images[0],
                  title: project.name,
                  tag: project.city+", "+project.state,
                  area: project.carpetArea.toString(),
                  beds: project.bedrooms,
                  baths: project.bathrooms,
                  cars: project.balconies || 0,
                }}
                size="compact"
              />
            ))}
          </div>

          {pagination && (
            <div className="mt-8 text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
