import { useContext, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import subCategoriesService from '../../services/subCategories/subCategoriesService';
import { AuthUserContext } from '../../hooks/useContext/AuthContext';
import { MoonLoader } from 'react-spinners';

const ChartHome = () => {
    const { user } = useContext(AuthUserContext);
    const [nameSubCategories, setNameSubCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [percentage, setPercentage] = useState([]);
    const [currentChart, setCurrentChart] = useState('bar'); 
    const [barOptions, setBarOptions] = useState({
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: []
        },
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        yaxis: {
            show: true,
            labels: {
                formatter: function (value) {
                    return value + '%';
                }
            }
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        theme: {
            monochrome: {
                enabled: false
            }
        },
        colors: ['#EC4899'], 
    });

    const [pieOptions, setPieOptions] = useState({
        chart: {
            type: 'pie'
        },
        labels: [],
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        legend: {
            position: 'bottom'
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        }
    });

    useEffect(() => {
        setBarOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
                categories: nameSubCategories
            }
        }));
        setPieOptions((prevOptions) => ({
            ...prevOptions,
            labels: nameSubCategories
        }));
    }, [nameSubCategories]);

    const getDataSubCategories = async () => {
        const datas = await subCategoriesService.getSubCategoriesById(user?._id);
        const getNameSubCategories = datas.map((subcategory) => subcategory.name);
        const getBudgetSubCategories = datas.map((subcategory) => subcategory.budget.budget);

        setSeries(getBudgetSubCategories);
        setNameSubCategories(getNameSubCategories);
    }

    useEffect(() => {
        getDataSubCategories();
    }, [user]);

    const data = [...nameSubCategories, ...series];

    useMemo(() => {
        const total = series.reduce((acc, num) => acc + num, 0);
        const caculatorPercentage = series.map(num => Math.floor((num / total) * 100));
        setPercentage(caculatorPercentage);
    }, [series]);

    const handleChartChange = (chartType) => {
        setCurrentChart(chartType);
    };

    return (
        <>
            {data.length === 0 ? (
                <div className='flex justify-center items-center'>
                    <MoonLoader color="#0be1db" />
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
