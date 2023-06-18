import { app, request }from "../init.spec";
describe('check if server is running', function () {
    it('server runs without error', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function (err) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
});