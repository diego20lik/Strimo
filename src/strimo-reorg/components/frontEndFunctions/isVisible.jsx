import { useState, useEffect } from "react";

export default (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        if(element){
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                    setState(entry.isIntersecting);
                    /* observer.unobserve(element.current); */
                }
                console.log(entry.isIntersecting);
            },
            {
                rootMargin
            }
            );
            
            element.current && observer.observe(element.current);
            
            return () => {
                observer.unobserve(element.current);
            };
        }
    }, []);

    return isVisible;
};
