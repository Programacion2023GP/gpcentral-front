import axios from "axios";
import type { GenericRepository, RequestOptions, Result } from "react-zustore";
import { env } from "../../constant";

export class GenericApi<T extends object> implements GenericRepository<T> {
  private baseUrl = env.API_URL;

  async getAll(prefix: string): Promise<Result<T[]>> {
    try {
      const res = await axios.get(`${this.baseUrl}/${prefix}`);
      return { ok: true, data: res.data?.result ?? res.data, message: "OK" };
    } catch (err: any) {
      return { ok: false, error: err, message: err.message };
    }
  }

  async create(data: T | T[], prefix: string, formData?: boolean): Promise<Result<T | T[]>> {
    try {
      const url = `${this.baseUrl}/${prefix}/createOrUpdate`;
      const res = formData
        ? await axios.post(url, data as any, { headers: { "Content-Type": "multipart/form-data" } })
        : await axios.post(url, data as any);
      return { ok: true, data: res.data?.result ?? res.data, message: "OK" };
    } catch (err: any) {
      return { ok: false, error: err, message: err.message };
    }
  }

  async delete(data: T, prefix: string): Promise<Result<void>> {
    try {
      const id = (data as any)?.id;
      await axios.delete(`${this.baseUrl}/${prefix}/${id}`);
      return { ok: true, data: undefined, message: "OK" };
    } catch (err: any) {
      return { ok: false, error: err, message: err.message };
    }
  }

  async request<R = T>(options: RequestOptions<T>): Promise<Result<R>> {
    try {
      const url = `${this.baseUrl}/${options.prefix}`;
      const config: any = { method: options.method };
      if (options.data) config.data = options.data;
      if (options.formData) config.headers = { "Content-Type": "multipart/form-data" };
      const res = await axios(url, config);
      return { ok: true, data: res.data?.result ?? res.data, message: "OK" };
    } catch (err: any) {
      return { ok: false, error: err, message: err.message };
    }
  }
}
