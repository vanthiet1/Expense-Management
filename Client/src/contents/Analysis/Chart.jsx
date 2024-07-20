import { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import subCategoriesService from '../../services/subCategories/subCategoriesService';
import { AuthUserContext } from '../../hooks/useContext/AuthContext';

const ChartHome = () => {
    const { user } = useContext(AuthUserContext);
    const [nameSubCategories, setNameSubCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [percentage, setPercentage] = useState([]);
    const [currentChart, setCurrentChart] = useState('bar'); 

    const barOptions = {
        chart: { type: 'bar' },
        xaxis: { categories: nameSubCategories },
        fill: { opacity: 1 },
        stroke: { width: 1, colors: undefined },
        yaxis: {
            show: true,
            labels: { formatter: value => `${value}%` }
        },
        legend: { position: 'bottom' },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        theme: { monochrome: { enabled: false } },
        colors: ['#EC4899']
    };

    const pieOptions = {
        chart: { type: 'pie' },
        labels: nameSubCategories,
        fill: { opacity: 1 },
        stroke: { width: 1, colors: undefined },
        legend: { position: 'bottom' },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        }
    };

    const getDataSubCategories = async () => {
        try {
            const datas = await subCategoriesService.getSubCategoriesById(user?._id);
            const validSubCategories = datas.filter(subcategory => subcategory.budget?.budget != null);

            if (validSubCategories.length === 0) {
                setNameSubCategories([]);
                setSeries([]);
                setPercentage([]);
                return;
            }

            const getNameSubCategories = validSubCategories.map(subcategory => subcategory.name);
            const getBudgetSubCategories = validSubCategories.map(subcategory => subcategory.budget.budget);

            setNameSubCategories(getNameSubCategories);
            setSeries(getBudgetSubCategories);
        } catch (error) {
            console.error("Error fetching subcategories: ", error);
        }
    }

    useEffect(() => {
        if (user?._id) {
            getDataSubCategories();
        }
    }, [user]);

    useEffect(() => {
        if (series.length > 0) {
            const total = series.reduce((acc, num) => acc + num, 0);
            const caculatorPercentage = series.map(num => Math.floor((num / total) * 100));
            setPercentage(caculatorPercentage);
        }
    }, [series]);

    const handleChartChange = (chartType) => {
        setCurrentChart(chartType);
    };

    return (
        <>
            {series.length === 0 ? (
                <div className='flex justify-center items-center'>
                    <span className='text-[25px]'>Hiện tại chưa có dữ liệu vui lòng thêm chi tiêu và ngân sách</span>
                </div>
            ) : (
                <>
                    <div className="flex justify-center mb-4">
                        <button
                            className={`px-4 py-2 mr-2 rounded-md ${currentChart === 'bar' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                            onClick={() => handleChartChange('bar')}
                        >
                            Biểu đồ cột
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${currentChart === 'pie' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                            onClick={() => handleChartChange('pie')}
                        >
                            Biểu đồ hình tròn
                        </button>
                    </div>
                    {currentChart === 'bar' && (
                        <div id="chart">
                            <Chart options={barOptions} series={[{ data: percentage }]} type="bar" height={550} />
                        </div>
                    )}
                    {currentChart === 'pie' && (
                        <div id="pie-chart">
                            <Chart options={pieOptions} series={percentage} type="pie" height={550} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ChartHome;
