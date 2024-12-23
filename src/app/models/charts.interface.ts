export interface IPieChart {
  labels: string[];
  datasets: IPieDataSet[];
}

export interface IPieDataSet {
  data: number[];
}

export interface IPieChartOptions {
  plugins: {
    legend: {
      display: boolean;
      position: 'top' | 'left' | 'bottom' | 'right';
    };
  };
}
