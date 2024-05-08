import { useEffect, useRef, useState, useContext } from "react";
import { PlayerContext } from '../contexts/PlayerContext.js';

function PlayerPage({ isPlayerShowing, hidePlayer, className }) {
    const containerRef = useRef(null);
    const isFirstRender = useRef(true);
    const { playingMusic } = useContext(PlayerContext) || {};

    const { id, title, thumbnail, duration, uploadTime, channelTitle } = playingMusic || {};

    useEffect(() => {
        isFirstRender.current = true;
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (isPlayerShowing) {
                containerRef.current.classList.remove('animate-hide');
                containerRef.current.classList.add('animate-show');
            }
            else {
                containerRef.current.classList.remove('animate-show');
                containerRef.current.classList.add('animate-hide');
            }
        }

        isFirstRender.current = false;
    }, [isPlayerShowing]);

    return (
        <div 
            ref={containerRef}
            className={`bg-black w-dvw h-dvh fixed inset-x-0 flex justify-center tablet:flex-col tablet:px-3 laptop:px-24 tablet:py-14 ${isPlayerShowing ? 'top-0' : 'top-out'} ${className}`}    
        >
            <div className='-z-10 w-full h-full absolute inset-0'>
                <img 
                    src={thumbnail}
                    className='w-full h-full object-cover blur-xl opacity-50 tablet:blur-sm tablet:opacity-65'
                />
            </div>
            <div className='p-10 w-full h-fit max-h-full bg-opacity-45 overflow-y-scroll tablet:bg-white tablet:backdrop-blur-[35px] tablet:bg-opacity-10'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ullam distinctio at aut id officiis consequuntur tenetur blanditiis aspernatur accusamus! Alias eligendi deserunt quae, laudantium vel repudiandae modi, adipisci praesentium veniam porro reprehenderit cupiditate veritatis possimus ullam eius quibusdam quasi nesciunt natus vero maxime. Nihil, libero quis rerum soluta suscipit distinctio dolorum ea iusto harum nostrum, autem perspiciatis esse nisi nesciunt fugit id voluptas, accusantium reprehenderit aut. Eius voluptas vitae, mollitia, unde nam possimus iusto quaerat asperiores dolor at eveniet. Modi praesentium eaque veritatis. Nemo repudiandae tenetur excepturi ab quia omnis tempore! Cum, a ducimus illum facilis odio reprehenderit quas enim debitis labore blanditiis dolores iure repellendus. Tenetur, doloremque! Accusantium, ipsum aspernatur voluptates deleniti doloribus at, optio magnam facere non corporis dignissimos consequuntur animi! Quidem amet sint, cum, quas architecto dolorum aut voluptas voluptatibus at incidunt reiciendis. Neque expedita harum blanditiis tempora reprehenderit eius fugiat nam quos, quisquam eaque enim. Minus placeat voluptates distinctio eveniet laborum odio illum facere enim eum esse? Possimus quia cumque corporis nesciunt quae consequuntur eius magni facere aut tenetur, asperiores debitis illo, consequatur nam. Quod accusamus impedit nobis, provident inventore quos libero sapiente similique neque possimus totam qui perferendis, sed deserunt nihil magnam expedita quam reprehenderit labore! Eius vero soluta odit aliquid quidem? Ut deleniti eveniet odit officiis sed eos nobis nulla perferendis quaerat rerum iusto at omnis veniam accusantium alias magnam distinctio dolorem id dignissimos, dolorum nemo rem. Fugit accusamus maxime atque, ea nihil veritatis suscipit porro. Perferendis porro quae iste dolores facere quo et cupiditate a nobis, delectus mollitia ea fugiat perspiciatis hic ab libero quaerat repellendus fuga. Nulla suscipit incidunt dignissimos ullam tempora. Incidunt ipsam dolorem animi eius quis magni, dolor fugiat quod saepe id magnam eum debitis ut laudantium molestias iusto labore, temporibus perspiciatis excepturi neque facilis reprehenderit numquam voluptatum. Reprehenderit veritatis maxime eum molestiae. Sunt, omnis voluptatem qui blanditiis libero cum, id dolores aspernatur voluptas eveniet exercitationem esse voluptatum provident rerum facilis nisi consequuntur vero distinctio aut in deserunt explicabo ipsam dolorum? Quam porro quis, deleniti necessitatibus esse repudiandae aliquam itaque in odit obcaecati voluptas numquam impedit debitis deserunt quia animi ab reprehenderit, modi earum culpa dolorum. Architecto optio dolore enim quisquam voluptate quia. Facere blanditiis quisquam recusandae! Facilis qui quos quae quam quibusdam eligendi provident, magni eum fugiat, alias expedita necessitatibus suscipit sunt at, ad consequatur velit reiciendis accusantium natus esse iusto doloribus eveniet nulla? Debitis, et? Quis, assumenda nihil. Totam debitis, corrupti sed eos at necessitatibus in iste repellendus corporis eaque fuga velit, nobis maiores recusandae voluptatibus, vel dolorem! Aperiam, quia rem suscipit perspiciatis illo quisquam quis laudantium? Ut nobis ab qui recusandae maxime fugiat at natus odio molestias. Ex officia cum sequi, commodi adipisci obcaecati id! Accusantium, quas consequuntur? Debitis, consectetur natus maiores rerum recusandae vel tempore fuga nisi pariatur dolores maxime a rem. Ipsam a incidunt possimus, harum optio minus corporis culpa quae aspernatur maxime nam ducimus ipsa vel cupiditate praesentium quas sapiente iusto ratione hic nihil vero. Temporibus, praesentium laudantium! Aliquam odio nisi consequuntur nihil quasi omnis commodi, sunt saepe dicta expedita sequi, laudantium odit excepturi tempora libero. Distinctio deserunt nulla quidem earum nemo saepe velit est adipisci odio culpa. Maxime laboriosam fugit exercitationem nobis quidem quisquam magnam mollitia neque eos iusto! Hic voluptas provident recusandae ut similique illum quaerat adipisci nemo, quis, labore at illo, culpa quae ipsum ea quo! Consequuntur ea hic aperiam saepe rem? Voluptas sequi ipsum praesentium accusantium, dolore odio illum incidunt reiciendis facilis impedit repudiandae quae consequuntur voluptates aliquid itaque consequatur repellat expedita doloribus sit quia cum dignissimos eos fugit sed. Ut repudiandae, nam voluptates hic est a quidem quas cumque quis ab atque id non exercitationem dolorum suscipit illo! Iusto est veritatis in sunt quae, saepe, magni iure impedit laudantium perspiciatis, id expedita optio fugiat debitis? Officia quaerat harum quae dignissimos reiciendis quidem ut mollitia alias tenetur, sequi cum recusandae adipisci a vitae, deserunt tempora consequuntur enim sunt ab nemo aperiam repellat soluta cumque. Vel cumque facere, vero asperiores ex pariatur. Temporibus ratione eos natus, impedit placeat unde itaque aut cupiditate dignissimos, eum facere? Eius pariatur libero cumque nostrum vitae corporis. Sed, blanditiis, consequatur veniam quasi quidem, cum cumque quam modi optio doloribus repudiandae vel explicabo velit tempora laboriosam error? Tenetur ea laudantium dolorem blanditiis quam praesentium consequatur incidunt tempora doloribus, perferendis corporis illo, atque quidem nam quas velit reprehenderit odio nisi repellendus quia ipsum. Illum, dolorum nostrum? Quas minima aspernatur sequi, voluptatem laudantium beatae vel nemo repudiandae porro expedita dignissimos ipsam odit accusamus assumenda maiores quasi consectetur voluptatum eius similique officia! Illo nesciunt molestias voluptas, perspiciatis quam est obcaecati non. Vero laudantium tempore nam excepturi mollitia exercitationem in delectus numquam voluptate repellat sed quisquam, magnam veniam nostrum cumque, amet voluptatem. Sapiente possimus architecto veritatis error, fugiat non necessitatibus quibusdam nemo suscipit assumenda totam nobis consequuntur neque, fuga ducimus omnis ratione corporis? Eveniet quod consectetur, est, omnis repellendus ab, error aliquid itaque sequi quasi saepe cumque voluptatem ad placeat? Cum officia illo laudantium necessitatibus dolorum veniam, velit similique quas minus est, error ex, omnis culpa voluptas doloremque perferendis quam minima quia alias itaque incidunt? Laboriosam totam aliquid nihil animi vero expedita quae corporis nesciunt cupiditate aut ad fugit dignissimos, sunt exercitationem eveniet itaque harum esse dolore at cum ea optio. Eius nesciunt delectus tempora, sapiente reiciendis suscipit. Aliquid placeat culpa aperiam distinctio amet, maiores aliquam quisquam provident odio minima, sunt iste illo soluta blanditiis nihil optio, alias veniam vero eos necessitatibus porro. Doloribus distinctio quidem maiores aut officia consequuntur nihil ipsam. Numquam, dolorum ea! Modi iure nam, quaerat pariatur suscipit voluptas consequuntur. Architecto consequuntur, amet ad voluptate voluptatum reprehenderit culpa quaerat iste autem earum aliquam maiores, exercitationem modi dolorum, tempore nulla facere aspernatur alias nobis. Quod dignissimos sequi et cumque. Eveniet expedita id ea, nesciunt sint harum inventore natus voluptatibus accusamus, recusandae impedit sed voluptate aperiam placeat mollitia quia hic nobis dicta officia eaque? Veniam soluta exercitationem iure a tempora. Odit doloremque reprehenderit voluptatibus quos, accusamus pariatur inventore voluptates eos atque odio. Illum facere sit delectus laboriosam saepe ab!
            </div>
        </div>
    );
}

export default PlayerPage;