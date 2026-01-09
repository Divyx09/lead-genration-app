import teamImage from '../../assets/images/pexels-fauxels-3182834.svg';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="animate-slide-in">
            <div className="relative">
              <img
                src={teamImage}
                alt="Our Team"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-4xl font-bold">10+</h3>
                <p className="text-lg">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="animate-slide-up">
            <h2 className="text-gray-900 mb-6">
              About <span className="text-primary">LeadGen</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a leading lead generation company dedicated to helping businesses 
              grow by connecting them with qualified prospects. Our team of experts uses 
              cutting-edge strategies and proven methodologies to deliver exceptional results.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With over a decade of experience, we've helped hundreds of companies across 
              various industries achieve their growth targets through quality lead generation.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h4>
                  <p className="text-gray-600">
                    Our team consists of industry veterans with proven track records
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h4>
                  <p className="text-gray-600">
                    We guarantee high-quality leads that convert into real business
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h4>
                  <p className="text-gray-600">
                    Data-driven strategies that deliver measurable business growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
