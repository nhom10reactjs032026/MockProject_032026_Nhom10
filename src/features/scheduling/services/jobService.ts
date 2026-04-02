// features/scheduling/services/jobService.ts
import type { Job, CreateJobForm, JobStatus } from "../types/scheduling.types";
import { mockJobs, mockJobDetail } from "../data/mockData";

export const jobService = {
  // Lấy danh sách jobs
  getJobs: async (params?: {
    status?: JobStatus | 'ALL';
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Job[]; total: number }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockJobs];
    
    if (params?.status && params.status !== 'ALL') {
      filtered = filtered.filter(job => job.status === params.status);
    }
    
    if (params?.search) {
      filtered = filtered.filter(job => 
        job.customerName.toLowerCase().includes(params.search!.toLowerCase()) ||
        job.id.toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    
    const start = ((params?.page || 1) - 1) * (params?.limit || 10);
    const end = start + (params?.limit || 10);
    
    return {
      data: filtered.slice(start, end),
      total: filtered.length,
    };
  },

  // ✅ Lấy chi tiết job - sử dụng mock data
  getJobById: async (id: string): Promise<Job> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Tìm job trong mockJobs
    const job = mockJobs.find(j => j.id === id);
    
    if (!job) {
      // Nếu không tìm thấy, trả về job mẫu từ mockJobDetail
      return {
        id: id,
        customerType: "B2B",
        customerName: mockJobDetail.client.name,
        serviceType: mockJobDetail.service.name as any,
        state: mockJobDetail.service.state,
        date: mockJobDetail.service.date,
        timeStart: mockJobDetail.service.time.split('|')[0].trim(),
        timeEnd: "",
        note: "",
        status: "NEW",
        assignedNotary: mockJobDetail.notary.name,
        createdAt: new Date().toISOString(),
      };
    }
    
    return job;
  },

  // Tạo job mới
  createJob: async (data: CreateJobForm): Promise<Job> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newJob: Job = {
      id: `JOB-${Math.floor(Math.random() * 1000)}`,
      ...data,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    return newJob;
  },

  // Assign notary
  assignNotary: async (jobId: string, notaryId: string): Promise<Job> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) throw new Error('Job not found');
    return { ...job, assignedNotary: `Notary-${notaryId}` };
  },
};